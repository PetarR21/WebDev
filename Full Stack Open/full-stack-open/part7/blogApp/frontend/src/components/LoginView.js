import LoginForm from './LoginForm';

const LoginView = () => {
  return (
    <div className='container mx-auto p-6'>
      <h2 className='text-4xl font-semibold my-6'>Log in to application</h2>
      <LoginForm />
    </div>
  );
};

export default LoginView;
