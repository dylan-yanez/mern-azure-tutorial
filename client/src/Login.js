import React from 'react';
import './Login.css';

function Login() {
  return (
    <div className="my-5 gradient-form">

      <div className="row">

        <div className="col-6 mb-5">
          <div className="d-flex flex-column ms-5">

            <div className="text-center">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                style={{ width: '185px' }} alt="logo" />
              <h4 className="mt-1 mb-5 pb-1">We are TuneVista</h4>
            </div>

            <p>Please login to your account</p>

            <div className="mb-4">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" />
            </div>

            <div className="text-center pt-1 mb-5 pb-1">
              <button className="btn btn-primary mb-4 w-100 gradient-custom-2">Sign in</button>
              <a className="text-muted" href="#!">Forgot password?</a>
            </div>

            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
              <p className="mb-0">Don't have an account?</p>
              <button className='btn btn-outline-danger mx-2'>
                Danger
              </button>
            </div>

          </div>

        </div>

        <div className="col-6 mb-5">
          <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">

            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 className="mb-4">We are more than just a Music Player</h4>
              <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;
