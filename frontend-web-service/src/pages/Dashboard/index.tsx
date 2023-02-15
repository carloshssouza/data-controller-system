import React from 'react'

export default function Dashboard() {
  return (
    <>
      <div>
        <h1>APIs</h1>
        <div>
          <div>
            <input type="text" /> //search
            <button>Search</button>
          </div>
          <div>
            <div>
              <div>Api1</div> //cards
              <div>Api2</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h1>Error logs</h1>
        <div>
          <div>quantidade de vazamentos</div>
          <div>api mais vazada</div>
          <div>dados mais vazado</div>
        </div>
        <div>
          <div>Grafico de vazamento, linha do tempo todas as apis</div>
        </div>
      </div>
    </>
  )
}
