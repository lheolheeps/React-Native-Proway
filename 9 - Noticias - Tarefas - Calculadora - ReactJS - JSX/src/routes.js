import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './pages/Header/header';
import Tarefas from './pages/Tarefas/tarefas';
import Calculadora from './pages/Calculadora/calculadora';
import Noticias from './pages/Noticias/noticias';
import Erro404 from "./pages/404/404";

class Routes extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route path="/" exact render={props => <Tarefas tarefas={this.props.tarefas} />} />
                    <Route path="/tarefas" render={props => <Tarefas tarefas={this.props.tarefas} />} />
                    <Route path="/calculadora" component={Calculadora} />
                    <Route path="/noticias" exact render={props => <Noticias tipo="pais" />} />
                    <Route path="/noticias/pais" render={props => <Noticias tipo="pais" />} />
                    <Route path="/noticias/pesquisa" render={props => <Noticias tipo="pesquisa" />} />
                    <Route path="/noticias/favoritos" render={props => <Noticias tipo="favoritos" />} />
                    <Route component={Erro404} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Routes;