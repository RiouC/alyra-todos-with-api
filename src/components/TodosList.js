import Todo from "./Todo"

const TodosList = (props) => {
    const { todos } = props
    console.log(todos);
    return todos.map((el) => {
        return <Todo key={el.id} todo={el} />
    })
}

export default TodosList;
