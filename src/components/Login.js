const Login = () => {
    return (
        <div className="d-flex flex-column align-items-center">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" className="mb-3"/>

          <label htmlFor="password">Password</label>
          <input type="password" name="password" className="mb-3"/>

          <button className="btn btn-primary">Login</button>
        </div>
    );
};

export default Login;
