function getUnique(list){
  newList = []
  for (let i = 0; i < list.length; i++){
    if(!(list[i] in newList)){
      newList.push(list[i])
    }
  }
  return newList;
}

function getStates(races){
    states = []
  
    for (let i = 0; i < races.length; i++){
      states.push(races[i].state)
    }
    states = getUnique(states)
    states.sort()
    return states
  }
    
  function getFiltered(results, query, state){
    if (state.includes("All") && query.trim() == ""){
      return results
    } 
    output = []
    for (let i = 0; i < results.length; i++){
      if ((state.includes("All") && (results[i].state == state) )||
          (query != "" && results[i].name.toUpperCase().includes(query.toUpperCase()))){
          output.push(results[i])
      }
    }
    return output
  }
  
  module.exports = {
      getFiltered: getFiltered,
      getStates: getStates
  }