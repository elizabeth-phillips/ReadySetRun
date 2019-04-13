function getStates(races){
    states = []
  
    for (let i = 0; i < races.length; i++){
      states.push(races[i].state)
    }
    states.sort()
    return states
  }
    
  function getFiltered(results, query, state){
    if (state == "All" && query.trim() == ""){
      return results
    } 
    output = []
    for (let i = 0; i < results.length; i++){
      if ((state != "All" && results[i].state == state)||results[i].name.includes(query)){
        output.push(results[i])
        console.log(output);
      }
    }
    return output
  }
  
  module.exports = {
      getFiltered: getFiltered,
      getStates: getStates
  }