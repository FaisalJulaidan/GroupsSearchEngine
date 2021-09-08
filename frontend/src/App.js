import './variables.less';
import './App.less';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { Layout } from 'antd';
import { Home } from './pages';

const { Header, Content } = Layout;

function App() {
  return (
    <Router>
      <Layout>
        <Header id='Header'>
          <h1 className='title'>Groups Search Engine</h1>
        </Header>
        <Content id='Content'>
          <Switch>
             <Route path='/' exact>
              <Home />
            </Route>
          </Switch>
        </Content>
        {/*<Footer id='Footer'>Footer</Footer>*/}
      </Layout>
    </Router>
  );
}

export default App;
