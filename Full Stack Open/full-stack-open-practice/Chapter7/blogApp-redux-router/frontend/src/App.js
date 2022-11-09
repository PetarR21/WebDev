import { useSelector } from 'react-redux';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';

const App = () => {
  const user = useSelector((state) => state.user);

  return (
    <div>
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <h1>blogs</h1>
          <h3>{user.name} logged in</h3>
          <LoggedUser user={user}/>
          <BlogList />
        </div>
      )}
    </div>
  );
};

export default App;
