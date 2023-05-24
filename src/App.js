import axios from 'axios'
import { useState } from 'react'

function App() {

  const [conselho, setConselho] = useState("")
  const [tema, setTema] = useState(null)
  const label = "Type a term to get an advice. Let empty to random."
  const baseURL = "https://api.adviceslip.com/advice"
  
  async function gerar(){
    const res = await axios.get(baseURL + (tema ? "/search/" + tema : ""))
    let conselhoGerado = ""

    if(res.data.slips || res.data.slip){
      conselhoGerado = tema ? res.data?.slips[0].advice : res.data?.slip?.advice

    }else{
      conselhoGerado = "Sorry. I couldn't generate advice. Search for another term in English."
    }

    
    setConselho(conselhoGerado)
  }

  return (
    <div className="container-xl">
      <div className="row">
        <div className="col">
          <h1 className="border-bottom pb-3 border-success">Advice generator</h1>
        </div>
      </div>

      <div className="row">
        <div className="col">
          { tema && tema.length > 0 ? (<label for="term">{label}</label>) : ""}
          <input className="form-control" id='term' onChange={(event) => setTema(event.target.value)} placeholder={label} />
        </div>
      </div>

      <div className="row my-3">
        <div className="col text-center">
          <button className="btn btn-success" onClick={gerar}>Get</button>
        </div>
      </div>

      {
        conselho && conselho.length > 0 ? (
          <div className="row">
            <div className="col">
              <div className="card p-4">
                { conselho }
              </div>
            </div>
          </div>
        ) : (null)
      }
    </div>
  )
}

export default App
