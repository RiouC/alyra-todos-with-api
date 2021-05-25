import { useTodosDispatch } from "../context/TodosDispatchContext"
import { useIsMounted } from "../hooks/useIsMounted";

const DeleteTodo = ({ todo }) => {
    const dispatch = useTodosDispatch();
    const isMounted = useIsMounted();
    const deleteTodo = () => {
        // dispatch({ type: "DELETE", payload: todo })
        fetch(`${process.env.REACT_APP_API_URL}/todos/${todo.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`something went wrong ${response.statusText}`);
                }
                return response.json();
            })
            .then(result => {
                if (isMounted.current) {
                    dispatch({ type: "DELETE", payload: result });
                }
            })
            .catch(error => {
                if (isMounted.current) {
                    dispatch({ type: "FETCH_FAILURE", payload: error.message });
                }
            });
    };
    return (
        <button
          className="btn btn-danger btn-sm"
          type="button"
          onClick={deleteTodo}
        >
          Supprimer
        </button>
    );
};

export default DeleteTodo;
