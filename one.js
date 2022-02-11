import Corestore from 'corestore'
import Hyperswarm from 'hyperswarm'
import Autobase from 'autobase'

const main = async() =>{

const store = new Corestore('./oneCore');
const swarm = new Hyperswarm()

// Setup corestore replication
swarm.on('connection', (connection) => store.replicate(connection))

const userA = store.get({name:'userA'})
//const userB = store.get(Buffer.from('<other peer public key >', 'hex'))

await userA.ready();

const topic = Buffer.alloc(32).fill('hello world')

swarm.join(topic)

await swarm.flush();

console.log("User A public Key :-",userA.key.toString('hex'));

// const baseA = new Autobase({inputs: [userA,userB],localInput: userA,autostart:true});

// await baseA.append('A0: hello!')


// let len =0 ;
//   setInterval(async function () {
//     await baseA.view.update();
//    if(getLength(baseA.view.autobase._inputs) > len){
//      len = getLength(baseA.view.autobase._inputs);
//     for await (const node of baseA.createCausalStream()) {
//       console.log(node.value?.toString())
//     }
//    }
//    }, 5000);
}

const getLength = (inputs) => {
  let sum = 0;
  for(let i = 0; i< inputs.length ; i++)
  {
    sum += inputs[i].length;
  }
  return sum ;
}
main();

