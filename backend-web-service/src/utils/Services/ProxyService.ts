import { spawn } from 'child_process'

const startProxy = () => spawn('yarn', ['start'], { cwd: '../../../../proxy-server', detached: true })

export default startProxy
