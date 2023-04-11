import { execSync, spawn } from 'child_process'
import path from 'path'

interface ProxyResponse {
  status: number
  message: string
}

class ProxyService {
  public async startProxy (): Promise<string | any> {
    console.log('Starting proxy server...')
    return new Promise((resolve, reject) => {
      const proxyProcess = spawn('yarn', [
        'start:proxy'
      ], {
        cwd: path.resolve(__dirname, '../../../../proxy-server')
      })

      console.log(`Proxy process PID: ${proxyProcess.pid}`) // log the PID
      proxyProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`)
        if (data.includes('Proxy server listening on 8888')) {
          console.log('Proxy server started successfully.')
          resolve('Proxy server started successfully.')
        }
      })

      proxyProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`)
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({
          status: 500,
          message: `Failed to start proxy server. Error: ${data}`
        })
      })

      proxyProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`)
        if (code !== 0) {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({
            status: 500,
            message: `Failed to start proxy server. Exit code: ${code}`
          })
        }
      })
    })
  }

  public async stopProxy (): Promise<ProxyResponse> {
    const port = 8888
    let pid: string | undefined

    try {
      const output = execSync(`lsof -t -i :${port}`)
      pid = output.toString().trim() // convert output to string and remove whitespace
    } catch (error) {
      console.error(`Error getting PID for port ${port}:`, error)
      return {
        status: 500,
        message: 'Error stopping proxy server.'
      }
    }

    if (!pid) {
      console.error(`No process found running on port ${port}.`)
      return {
        status: 500,
        message: 'Proxy server is not running.'
      }
    }

    try {
      execSync(`kill -9 ${pid}`)
      console.log('Proxy server stopped successfully.')
      return {
        status: 200,
        message: 'Proxy server stopped successfully.'
      }
    } catch (error) {
      console.error('Error stopping proxy server:', error)
      return {
        status: 500,
        message: 'Error stopping proxy server.'
      }
    }
  }

  public async checkProxyServer (): Promise<ProxyResponse | any> {
    return new Promise((resolve, reject) => {
      const lsofProcess = spawn('lsof', ['-i', ':8888'])

      lsofProcess.stdout.on('data', (data) => {
        if (data.toString().includes('LISTEN')) {
          resolve({
            status: 200,
            message: 'Proxy server is running.'
          })
        } else {
          reject({
            status: 500,
            message: 'Proxy server is not running.'
          })
        }
      })

      lsofProcess.stderr.on('data', (err) => {
        console.error(err)
        reject({
          status: 500,
          message: 'Failed to check proxy server status.'
        })
      })

      lsofProcess.on('close', (code) => {
        if (code !== 0) {
          console.error(`child process exited with code ${code}`)
          reject({
            status: 500,
            message: `Failed to check proxy server status. Exit code: ${code}`
          })
        }
      })
    })
  }
}

export default new ProxyService()
