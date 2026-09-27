import React from 'react';
import { Link } from "react-router-dom";
import { Container, Table, Form, Button, Alert } from 'react-bootstrap';

// Enquanto o fórum não tem login, os votos usam o mesmo usuário fixo com que o
// backend cadastra as perguntas.
const ID_USUARIO = 1;

function postVoto(id_pergunta, valor, atualizar, informarErro) {
  const request = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id_usuario: ID_USUARIO, valor: valor })
  };
  fetch(`http://localhost:5000/perguntas/${id_pergunta}/votos`, request)
    .then(response => response.json().then(data => ({ ok: response.ok, data: data })))
    .then(({ ok, data }) => ok ? atualizar(data) : informarErro(data.erro))
    .catch(() => informarErro('Não foi possível registrar o voto. Tente novamente.'));
}

function postPergunta(pergunta, update) {
  const request = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pergunta: pergunta })
  };
  fetch('http://localhost:5000/perguntas', request)
    .then(response => response.json())
    .then(data => update(data.id_pergunta, pergunta));
}

function NovaPergunta(props) {
  const [texto, setTexto] = React.useState('');
  
  function handleChange (event) {
    setTexto(event.target.value);
  }

  function handleClick(event) {
    postPergunta(texto, props.update);
    setTexto('');
  }

  return (
    <Container>
      <Form>
        <Form.Group>
          <Form.Label> Faça a sua pergunta: </Form.Label>
          <Form.Control id="textarea-pergunta" as="textarea" value={texto} onChange={handleChange}/>
        </Form.Group>
        <Button id="btn-pergunta" onClick={handleClick}>Enviar</Button>
      </Form>
    </Container>
  );
}

function Pergunta() {
  const [listaPerguntas, setListaPerguntas] = React.useState([]);
  const [erroVoto, setErroVoto] = React.useState('');

  function adicionarNovaPergunta(id_pergunta, pergunta) {
    setListaPerguntas((prev) => {
      const novaPergunta = {
        id_pergunta: id_pergunta,
        texto: pergunta,
        num_respostas: 0,
        placar: 0,
        voto_usuario: 0,
      };
      return [...prev, novaPergunta];
    });
  }

  // A linha votada é atualizada no lugar; a lista só é reordenada pelo placar
  // quando a página é carregada de novo, para a pergunta não sair de baixo do cursor.
  function atualizarVoto(resultado) {
    setErroVoto('');
    setListaPerguntas((prev) => prev.map(p =>
      p.id_pergunta === resultado.id_pergunta
        ? { ...p, placar: resultado.placar, voto_usuario: resultado.voto_usuario }
        : p
    ));
  }

  function votar(id_pergunta, valor) {
    postVoto(id_pergunta, valor, atualizarVoto, setErroVoto);
  }

  function TabelaPerguntas() {   

    function LinhaTabela({ pergunta }) {
      return (
        <tr>
          <td className="text-center"> {pergunta.id_pergunta} </td>
          <td className="text-center text-nowrap">
            <Button size="sm" aria-label="Voto positivo"
                    variant={pergunta.voto_usuario === 1 ? 'success' : 'outline-success'}
                    onClick={() => votar(pergunta.id_pergunta, 1)}>▲</Button>
            <span className="mx-2">{pergunta.placar}</span>
            <Button size="sm" aria-label="Voto negativo"
                    variant={pergunta.voto_usuario === -1 ? 'danger' : 'outline-danger'}
                    onClick={() => votar(pergunta.id_pergunta, -1)}>▼</Button>
          </td>
          <td> {pergunta.texto} </td>
          <td className="text-center"> 
              <Link to = {`/resposta/${pergunta.id_pergunta}`}> 
                 {pergunta.num_respostas}
              </Link>
          </td>
        </tr>
      );
    }

    function TabelaPrincipal() {
      const linhas = listaPerguntas.map(p => ( <LinhaTabela pergunta={p} key={p.id_pergunta} /> ));  
      return (
        <div className="container">
          <center><h5>Peguntas Atuais</h5></center>
          { erroVoto && <Alert variant="danger" onClose={() => setErroVoto('')} dismissible>{erroVoto}</Alert> }
          <Table id="tabela-perguntas" striped bordered>
            <thead>
              <tr>
                <th className="text-center">ID</th>
                <th className="text-center">Votos</th>
                <th className="text-center">Pergunta</th>
                <th className="text-center"># Respostas</th>
              </tr>
            </thead>
            <tbody>
              {linhas}
            </tbody>
          </Table>
        </div>
      );
    }

    return (
      <div>
        <TabelaPrincipal />
        <NovaPergunta update={adicionarNovaPergunta}/>
      </div> 
    );
  }
    
  React.useEffect(() => {
    fetch(`http://localhost:5000/?id_usuario=${ID_USUARIO}`)
    .then((res) => res.json())
    .then((data) => setListaPerguntas(data));
  }, []);
    
  return (
    <div className="container"> 
      <TabelaPerguntas />
    </div>
  );
}

export default Pergunta;