import { spawn } from 'child_process'
import path from 'path'

class ProxyService {
  public startProxy (): Promise<string> {
    return new Promise((resolve, reject) => {
      const proxyProcess = spawn('gnome-terminal', ['-e', 'yarn start:proxy', '--working-directory', path.resolve(__dirname, '../../../../proxy-server')])

      proxyProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`)
        if (data.includes('Proxy server started')) {
          resolve('Proxy server started successfully.')
        }
      })

      proxyProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`)
        // eslint-disable-next-line prefer-promise-reject-errors
        reject(`Failed to start proxy server: ${data}`)
      })

      proxyProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`)
        if (code !== 0) {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject(`Failed to start proxy server. Exit code: ${code}`)
        }
      })
    })
  }

  public stopProxy (): Promise<string> {
    return new Promise((resolve, reject) => {
      const child = spawn('gnome-terminal', ['-e', 'yarn start:proxy', '--working-directory', path.resolve(__dirname, '../../../../proxy-server')])

      // Handle the SIGINT signal for the parent process
      process.on('SIGINT', () => {
        console.log('Received SIGINT signal. Stopping child process...')
        child.kill('SIGINT') // Emit the SIGINT signal to the child process
      })

      child.stdout.on('data', (data) => {
        console.log(`child process stdout: ${data}`)
        if (data.includes('Proxy server stopped')) {
          resolve('Proxy server stopped successfully.')
        }
      })

      child.stderr.on('data', (data) => {
        console.error(`child process stderr: ${data}`)
        // eslint-disable-next-line prefer-promise-reject-errors
        reject(`Failed to stop proxy server: ${data}`)
      })

      child.on('close', (code) => {
        console.log(`child process exited with code ${code}`)
        if (code !== 0) {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject(`Failed to stop proxy server. Exit code: ${code}`)
        }
      })
    })
  }
}

export default new ProxyService()
