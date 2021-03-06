import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import { loginAction } from '../../store/api-actions';
import { checkEmail, checkPassword, disableSignInSubmit } from '../../utils/util';


function LoginForm(): JSX.Element {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({
    email: '',
    password: '',
  });


  const changeInputValue = (checkFunction: (fieldValue: string) => boolean, setFunction: (fieldValue: string) => void, errorMessage: string, field: string) =>
    (evt: FormEvent<HTMLInputElement>) => {
      const value = evt.currentTarget.value;
      const errorValue = (checkFunction(value) || value === '') ? '' : errorMessage;
      setError({...error, [field]: errorValue});
      setFunction(value);
    };

  const handleEmailChange = changeInputValue(checkEmail, setEmail, 'Wrong Email', 'email');
  const handlePasswordChange = changeInputValue(checkPassword, setPassword, 'Wrong Password', 'password');


  const dispatch = useDispatch();
  const login = () => dispatch(loginAction({email, password}));

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    login();
  };

  return (
    <form data-testid='form' className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <div style={{color: 'red'}}>{error.email}</div>
        <input className="login__input form__input" type="email" name="email" placeholder="Email" required
          value={email} onChange={handleEmailChange}
          data-testid='email'
        />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <div style={{color: 'red'}}>{error.password}</div>
        <input className="login__input form__input" type="password" name="password" placeholder="Password" required
          value={password} onChange={handlePasswordChange}
          data-testid='password'
        />
      </div>
      <button className="login__submit form__submit button" type="submit" disabled={disableSignInSubmit(email, password)}>Sign in</button>
    </form>
  );
}

export default LoginForm;
