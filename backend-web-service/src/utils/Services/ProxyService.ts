import { spawn } from 'child_process'
import path from 'path'

const startProxy = () => {
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

export default startProxy
