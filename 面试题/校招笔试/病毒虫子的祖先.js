function Node(value){
    this.value=value;
    this.left=null;
    this.right=null;
}

function createTree(arr){
    var root=null;
    for(var i=0;i<arr.length;i++){
        root=insertNode(arr[i],root);
    }
    return root;
}

function insertNode(value,toNode){
    if(!toNode){
        toNode=new Node(value);
    }else if(toNode.value!=-1){
        if(!toNode.left){
            toNode=insertNode(value,toNode.left);
        }
        else if(!toNode.right){
            toNode=insertNode(value,toNode.right);
        }
    }
    return toNode;
}

var str='3 5 6 -1 -1 2 7 -1 -1 4 -1 -1 1 9 -1 -1 8 -1 -1'
var arr=str.split(' ');
arr=arr.map((item)=>{
    return parseInt(item);
});
console.log(createTree(arr));
