statusOfBoard();
if(document.cookie== 'ttntrinhnga@gmail.com'){
    let board = document.getElementById('board');
let html = '';
for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
        html += `
            <button class= 'btn' value = "${i+''+j}" onclick = "mark(${i},${j},'${document.cookie}')" id="${i+''+j}"></button>
        `;
    }
}
board.innerHTML = html;

//   function mark(i,j){
//     let index = i+""+j;
//     console.log(index)
//     document.getElementById(index).innerHTML = 'X';
//     markInFirebase(index);

//     }
// async function markInFirebase(index){
//     await firebase.firestore().collection('board').doc('hiMaF2ZneJ8ANs37tPUr').update({
//             nga: firebase.firestore.FieldValue.arrayUnion(index)
//         });
// }
}
if(document.cookie== 'abc@gmail.com'){
    let board = document.getElementById('board');
let html = '';
for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
        html += `
            <button class= 'btn' value = "${i+''+j}" onclick = "mark(${i},${j},'${document.cookie}')" id="${i+''+j}"></button>
        `;
    }
}
board.innerHTML = html;
// async function read(){
//     let result = await firebase.firestore().collection('board').where('user2', 'array-contains', '11').get();
//     console.log(result)
//     for(let a of result.docs){
//         console.log(a);
//     }
// }
//   function mark(i,j){
//     let index = i+""+j;
//     console.log(index)
//     document.getElementById(index).innerHTML = 'X';
//     markInFirebase(index);

//     }
}
  async function mark(i,j,email){
    let index = i+""+j;
    console.log(index);
    let result = await firebase.firestore().collection('board').doc('hiMaF2ZneJ8ANs37tPUr').get();
    let ngaAr = result.data().nga.length;
    let abcAr = result.data().abc.length;
    if(email == 'ttntrinhnga@gmail.com'){
        if(ngaAr== abcAr){
            checkEmpty(index).then(function(result){
                if(result){
                    console.log(result)
                    document.getElementById(index).innerHTML = 'X';
                    markInFirebase(index,email);
                }
            })
        }
    }
    if(email == 'abc@gmail.com'){
        if((ngaAr - abcAr) ==1){
            checkEmpty(index).then(function(result){
                if(result){
                    document.getElementById(index).innerHTML = 'O';
                    markInFirebase(index,email);

                }
            });
        }
    }
}
    function markShape(i,j,email){
        let index = i+""+j;
        if(email == 'ttntrinhnga@gmail.com'){
            
            document.getElementById(index).innerHTML = 'X';
        }
        if(email == 'abc@gmail.com'){
    
            document.getElementById(index).innerHTML = 'O';
        }    
 }
 function markUpdate(index,email){
    if(email == 'ttntrinhnga@gmail.com'){
        
        document.getElementById(index).innerHTML = 'X';
    }
    if(email == 'abc@gmail.com'){

        document.getElementById(index).innerHTML = 'O';
    }    
}
 async function checkEmpty(index){
     let result1 = await firebase.firestore().collection('board').where('nga','array-contains', index).get();
     let result2 = await firebase.firestore().collection('board').where('abc','array-contains', index).get();
     console.log(result1.empty);
     console.log(result2.empty);
     if(result1.empty && result2.empty) return true;
     return false;
 }
    
async function markInFirebase(index,email){
    if(email == 'ttntrinhnga@gmail.com'){
        await firebase.firestore().collection('board').doc('hiMaF2ZneJ8ANs37tPUr').update({
                nga: firebase.firestore.FieldValue.arrayUnion(index)
            });
    }
    else{
        await firebase.firestore().collection('board').doc('hiMaF2ZneJ8ANs37tPUr').update({
            abc: firebase.firestore.FieldValue.arrayUnion(index)
        });
    }
}
async function statusOfBoard(){
    // let result = await firebase.firestore().collection('board').get();
    // for(let doc of result.docs){
    //     console.log(doc.data())
    // }
    let user1Arr=[];
    let user2Arr = [];
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
           
            let index = i+''+j;
            // if(document.cookie == 'ttntrinhnga@gmail.com'){

                let result1 = await firebase.firestore().collection('board').where('nga','array-contains' ,index).get();
                if(!result1.empty){
                    user1Arr.push(i+''+j)
                    markShape(i,j,'ttntrinhnga@gmail.com')
                }
                let result2= await firebase.firestore().collection('board').where('abc','array-contains' ,index).get();
                if(!result2.empty){
                    user2Arr.push(i+''+j)
                    markShape(i,j,'abc@gmail.com')
                }
            // }
            // else{
            //     let result = await firebase.firestore().collection('board').where('abc','array-contains' ,index).get();
            //     if(!result.empty){
            //         markShape(i,j,'abc@gmail.com')
            //     }
            // }

        }
    }
    localStorage.setItem('user1',JSON.stringify(user1Arr))
    localStorage.setItem('user2',JSON.stringify(user2Arr))
}
async function listenRealTimeUpdate(){
    let isFirstRun = true;
    let ngaAr, abcAr;
        let result = await firebase.firestore().collection('board').doc('hiMaF2ZneJ8ANs37tPUr').get();
        ngaAr = result.data().nga.length;
        abcAr = result.data().abc.length;
    firebase.firestore().collection('board').doc('hiMaF2ZneJ8ANs37tPUr').onSnapshot(async function (snapshot) {
        if (isFirstRun) {
            isFirstRun = false;
            return;
        }
        let response = await firebase.firestore().collection('board').doc('hiMaF2ZneJ8ANs37tPUr').get();
        console.log(response.data().nga[ngaAr]);
        console.log(response.data().abc[abcAr]);
        if(ngaAr < response.data().nga.length){
            console.log('update')
            if(document.cookie == 'abc@gmail.com'){
                markUpdate(response.data().nga[ngaAr],'ttntrinhnga@gmail.com');
                console.log('abc')
            }
            ngaAr++;
            // else{
            //     markUpdate(response.data().abc[abcAr+1])

            // }
        }
        else{
            if(document.cookie == 'ttntrinhnga@gmail.com'){
                markUpdate(response.data().abc[abcAr],'abc@gmail.com' );
            }
            abcAr++;
            // else{
            //     markUpdate(response.data().nga[abcAr+1])

            // }
        }
        });

}
listenRealTimeUpdate();