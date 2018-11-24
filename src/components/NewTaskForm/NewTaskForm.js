import React from "react";
import Dixie from "dexie";
import "./NewTaskForm.scss";


let db = new Dixie("tasks_db");
db.version(1).stores({
    tasks: 'content,type'
});

class NewTaskForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isAddTasksScreen: true,
            isAddTextTaskScreen: false,
            isAddVideoTaskScreen: false,
        }
    }

    goToAddTextScreen = () => {
        this.setState({ isAddTasksScreen: false, isAddTextTaskScreen: true });
    }

    goToAddVideoScreen = () => {
        this.setState({ isAddTasksScreen: false, isAddVideoTaskScreen: true });
    }

    saveTextTask = (e) => {
        e.preventDefault();
        const text = this.text.value;
        this.setState({ isAddTasksScreen: true, isAddTextTaskScreen: false, isAddVideoTaskScreen: false }, () => {
            db.tasks.put({content: text, type: "text"}).then(() => {
                console.log(db.tasks.toCollection().toArray());
              }).catch(e => console.warn(e))
        });
    }

    saveVideoTask = (e) => {
        e.preventDefault();
        const url = this.url.value;
        this.setState({ isAddTasksScreen: true, isAddTextTaskScreen: false, isAddVideoTaskScreen: false }, () => {
            db.tasks.put({content: url, type: "video"}).catch(e => console.warn(e))
        });
    }

    render = () => {
        return (
            <div>
                {this.state.isAddTasksScreen ?
                    (<div>
                        <h2>Заработать карточек</h2>
                        <button onClick={this.goToAddTextScreen} >Создать текст карточку (+2 карточки в колоду)</button>
                        <button onClick={this.goToAddVideoScreen} >Создать видео карточку (+10 карточек в колоду)</button>
                    </div>) :
                    this.state.isAddTextTaskScreen ? 
                        (<div>
                            <h2>Загрузить текстовую карточку</h2>
                            <textarea ref={(c) => this.text = c} placeholder="Напишите ваше задание"/>
                            <button onClick={this.saveTextTask}>Загрузить</button>
                        </div>) :
                        (<div>
                            <h2>Загрузить видеокарточку (до 30 сек)</h2>
                            <input type="url" ref={(c) => this.url = c} placeholder="Вставьте сюда вашу ссылку на видео"/>
                            <button onClick={this.saveVideoTask}>Загрузить</button>
                        </div>)
                }
            </div>
        );
    }
};

export default NewTaskForm;