import { useTodosDispatch } from "../context/TodosDispatchContext";
import { useIsMounted } from "../hooks/useIsMounted";

const ToggleTodo = ({ todo }) => {
    const dispatch = useTodosDispatch();
    const isMounted = useIsMounted();

    const toggleCompleteTodo = () => {
        fetch(`${process.env.REACT_APP_API_URL}/todos/${todo.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...todo,
                isCompleted: !todo.isCompleted
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Something went wrong: ${response.textStatus}`);
                }
                return response.json();
            })
            .then(() => {
                if (isMounted.current) {
                    dispatch({ type: "TOGGLE", payload: todo })
                }
            })
            .catch(error => {
                if (isMounted.current) {
                    dispatch({ type: "FETCH_FAILURE", payload: error.message })
                }
            });
        // dispatch({ type: "TOGGLE", payload: todo })
    };
return (
    <button
      className={`btn btn-sm ${todo.isCompleted ? "btn-dark" : "btn-light"}`}
      type="button"
      onClick={toggleCompleteTodo}
    >
      {todo.isCompleted ? "Rétablir" : "Terminer"}
    </button>
);
};

export default ToggleTodo;
