import { spawn } from 'child_process'
import path from 'path'

class ProxyService {
  public startProxy () {
    const proxyProcess = spawn('gnome-terminal', ['-e', 'yarn start:proxy', '--working-directory', path.resolve(__dirname, '../../../../proxy-server')])

    proxyProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    proxyProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`)
    })

    proxyProcess.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }

  public stopProxy () {
    const child = spawn('gnome-terminal', ['-e', 'yarn start:proxy', '--working-directory', path.resolve(__dirname, '../../../../proxy-server')])

    // Handle the SIGINT signal for the parent process
    process.on('SIGINT', () => {
      console.log('Received SIGINT signal. Stopping child process...')
      child.kill('SIGINT') // Emit the SIGINT signal to the child process
    })

    child.stdout.on('data', (data) => {
      console.log(`child process stdout: ${data}`)
    })

    child.stderr.on('data', (data) => {
      console.error(`child process stderr: ${data}`)
    })

    child.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }
}

export default new ProxyService()
