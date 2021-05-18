export const todosReducer = (state, action) => {
    // ADD, DELETE, TOGGLE
    switch (action.type) {
    case "ADD":
        return {
            ...state,
            todos: [...state.todos, action.payload]
        };
    case "DELETE":
        return {
            ...state,
            todos: state.todos.filter((el) => el.id !== action.payload.id)
        };
    case "TOGGLE":
        return {
            ...state,
            todos: state.todos.map((el) => {
                if (el.id === action.payload.id) {
                    return {
                        ...el,
                        isCompleted: !el.isCompleted,
                    };
                }
                return el;
            })
        };
    case "FETCH_INIT":
        return {
            ...state,
            loading: true
        };
    case "FETCH_SUCCESS":
        return {
            ...state,
            loading: false,
            error: "",
            todos: action.payload
        };
        case "FETCH_FAILURE":
        return {
            ...state,
            loading: false,
            error: action.payload,
        };
    default:
        throw new Error(`Unsupported action type ${action.type} in todosReducer`);
    }
};
