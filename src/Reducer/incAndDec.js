const stateValue=0;

export const numberIncAndDec =(state=stateValue,action)=>{
    switch(action.type){
        case 'INCREMENT' :
            return state+1
        case 'DECREMENT' :
            return state-1
        default:
            return state;        
    }

}