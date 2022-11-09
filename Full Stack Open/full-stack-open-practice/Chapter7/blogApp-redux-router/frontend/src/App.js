import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';

const App = () => {
  return (
    <div>
      <h1>blogs</h1>
      <LoginForm />
      <BlogList />
    </div>
  );
};

export default App;
