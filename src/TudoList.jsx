import React, { useState } from "react";
import './assets/TudoList.css';
import Icone from './assets/tarefas-vazio.png';

function TudoList() {

    // só atribuo um valor à lista através de setLista, e à novoItem através de setNovoItem
    const [lista, setLista] = useState([]);
    const [novoItem, setNovoItem] = useState("");

    function adicionaItem(form) {
        // Para que o formulário não dispare, recarregue
        form.preventDefault();
        // Se estiver vazio não fará nada
        if (!novoItem) {
            return;
        }
        /* estou pegando o que já tem na lista, adicionando novo item e se ele 
        está completado ou não, false ou true, iniciando por false */
        setLista([...lista, { text: novoItem, isCompleted: false }]);
        setNovoItem("");
        document.getElementById("input-entrada").focus();
    }

    /* após o click no span essa função será ativada trazendo o index do item. 
       Na variável listaAux eu recebo a lista atual, em seguida, baseado na lista,
       uso o index para identificar o item clicado, basicamente pela posição dele na lista.
       Além disso pego o isCompleted e faço receber o oposto do valor atual dele (true ou false) */
    function clicou(index){
        const listaAux = [...lista];
        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setLista(listaAux);
    }

    // deleta apenas um item com base no seu index e atualiza a lista
    function deleta(index){
        const listaAux = [...lista];
        listaAux.splice(index, 1);
        setLista(listaAux);
    }

    function deletaTudo(){
        setLista([]);
    }

    return (
        <div>
            <h1>Lista de Tarefas</h1>
            <form onSubmit={adicionaItem}>
                <input
                    id="input-entrada"
                    type="text"
                    placeholder="Adicione uma tarefa..."
                    value={novoItem}
                    onChange={(e) => { setNovoItem(e.target.value) }} />
                <button type="submit" className="add">Adicionar</button>
            </form>
            <div className="listaTarefas">
                <div>
                    {
                        lista.length < 1
                            ?
                            <img className="bg-img" src={Icone} /> 
                            :
                            lista.map((item, index) => (
                                <div
                                    key={index} 
                                    className={item.isCompleted ? "item completo" : "item"}>
                                    <span onClick={() => { clicou(index) }}>{item.text}</span> 
                                    <button onClick={() => { deleta(index) }} className="del">Deletar</button>
                                </div>
                            ))
                    }

                </div>
                {
                    lista.length > 0 &&
                        <button onClick={() => { deletaTudo() }} className="deleteAll">Deletar Todas</button>
                }
            </div>
        </div>
    )
}

export default TudoList