//import sha256 function
const SHA256 = require('crypto-js/sha256');

//class block is made
class Block{
    //constructor to initialize the values
    // index is where the block sits on the chain
    //timestamp tells when block is created
    //data includes anything associated with the block
    /*previousHash is a string that contains the hash before
    this one */
    constructor(index, timestamp, data, previousHash=''){
    //pass these parameters
    this.index = index;
    this.timestamp =timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  
    }
    //calculate the hash function of the block and return the hash and identify the block on the blockchain
    calculateHash(){                                                                                
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
    
}


class Blockchain{
    //to initialize the blockchain
    constructor(){
        //an array of blocks
        this.chain = [this.createGenesisBlock()];
   
    }
    //creating the genesis block
    createGenesisBlock(){

        return new Block(0, "01/01/2019","Genesis block","0");
    }

    getLatestBlock(){
    //return latest block in the chain
        return this.chain[this.chain.length - 1];


    }
    addBlock(newBlock){
        //adding new block in the chain and get the lastest hash of that block
        newBlock.previousHash = this.getLatestBlock().hash;

        //recalculate its hash if the property changes in the block
        newBlock.hash = newBlock.calculateHash();

       // newBlock.mineBlock(this.difficulty);

        //pushes it onto the chain
        this.chain.push(newBlock);

    }
    //verify the integrity of the chain
    isChainValid(){

        for(let i = 1;i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            //check if the current hash of the block is still valid
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            //check if the current block points to previous block
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;

    }
}

//instance of the blockchain
let Testcoin = new Blockchain();

console.log('Mining block 1...');
Testcoin.addBlock(new Block( 1,"20/10/2019",{amount : 4}));

console.log('Mining block 2...');
Testcoin.addBlock(new Block( 2,"21/10/2019",{amount : 10}));

console.log('Mining block 3...');
Testcoin.addBlock(new Block(3,"22/10/2019",{amount : 20}));


console.log('is Testcoin valid? ' + Testcoin.isChainValid());

console.log(JSON.stringify(Testcoin, null, 2));


