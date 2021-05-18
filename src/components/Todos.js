import React, { useEffect, useReducer } from "react";
import TodosList from "./TodosList";
import AddTodoForm from "./AddTodoForm";
import { todosReducer } from "../reducers/todosReducer";
import { TodosDispatchContext } from "../context/TodosDispatchContext";

const initialTodos = [
    {
        text: "Forkez et cloner ce repo",
        isCompleted: true,
        id: "1b688c51-e990-4ce3-95a5-9018cf81d23d",
    },
    {
        text: "Refactor todos avec useReducer",
        isCompleted: false,
        id: "efc6331d-7ca2-49a6-b014-378b8280b33d",
    },
    {
        text: "Add dispatch to Context",
        isCompleted: false,
        id: "9e60d353-cd72-40bb-97e6-5841e51635c0",
    },
    {
        text: "Add Color Mode Context",
        isCompleted: false,
        id: "df0ce18c-b4fa-4651-82c0-72fad6b486e4",
    },
]

const initialState = {
    todos: [],
    loading: false,
    error: ""
}

const Todos = () => {
    const [state, dispatch] = useReducer(todosReducer,initialState
                                         // (initialState) => {
                                         //     return (
                                         //         JSON.parse(window.localStorage.getItem("my-new-todos")) || initialTodos
                                         //     );
                                         // }
                                        );

    // useEffect(() => {
    //     window.localStorage.setItem("my-new-todos", JSON.stringify(state));
    // }, [state]);

    const { todos, loading, error } = state;

    useEffect(() => {
        dispatch({type: "FETCH_INIT"});
        fetch(`${process.env.REACT_APP_API_URL}/todos`)
            .then(response => {
                console.log(response);
                if (!response.ok) {
                    throw new Error(`Something went wrong ${response.statusText}`);
                }
                return response.json();
            })
            .then(result => {
                dispatch({type: "FETCH_SUCCESS", payload: result});
            })
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                dispatch({type: "FETCH_FAILURE", payload: error.message});
            });
    }, []);
    
    return (
        <main>
          <h2 className="text-center">Ma liste de tâches ({state.length})</h2>
          {error && <p className="alert alert-danger">{error}</p>}
          <TodosDispatchContext.Provider value={dispatch}>
            <TodosList todos={state.todos} />
            <AddTodoForm />
            {loading && <p>Loading...</p>}
          </TodosDispatchContext.Provider>
        </main>
    );
};

export default Todos;
