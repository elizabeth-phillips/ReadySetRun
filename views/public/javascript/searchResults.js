function getUnique(list){
  newList = []
  for (let i = 0; i < list.length; i++){
    if(newList.indexOf(list[i]) == -1){
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
    if (state != "All" && results[i].state == state){
      output.push(results[i])
    }
    if (query != "" && results[i].name.toUpperCase().includes(query.toUpperCase())){
      output.push(results[i])
    }
  }
  return getUnique(output)
}

function getFilteredUsers(results, query){
  if (query.trim() == ""){
    return results
  } 
  output = []
  query = query.trim().toUpperCase()
  for (let i = 0; i < results.length; i++){
    current_name = results[i].first_name.toUpperCase()
    if (current_name.includes(query)){
      output.push(results[i])
    }
  }
  return getUnique(output)
}

module.exports = {
    getFiltered: getFiltered,
    getFilteredUsers: getFilteredUsers,
    getStates: getStates
}