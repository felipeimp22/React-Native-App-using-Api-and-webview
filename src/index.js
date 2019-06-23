import React from 'react';
import Routes from './routes';
import "./config/StatusBarConfig"

const App = () => <Routes/>

/* a função acima como é simples pode ser encurtada, mas tem a mesma cuncionalidade do exemplo:
class App extends Component{
    render(){
        return <Routes/>
    }
}
*/

export default App;