window.addEventListener("load", () => {
  let cat_json = [];
  let events_json = [];
  let results_json = [];
  var cat_select = document.querySelector("#cat_select");
  var event_select = document.querySelector("#event_select")
  var round_select = document.querySelector("#round_select")
  var result = document.querySelector("#result")
  event_select.style.display = "none";
  round_select.style.display = "none";
  var select_cat,select_event;
  var cat_name = document.querySelector("#cat")
  var event_name = document.querySelector("#eve")
  //console.log(cat_select);

  var fetch_cat = () => {
    fetch("https://api.mitrevels.in/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/JSON"
      },
      credentials: "include",
      redirect: "error",
      credentials: "omit"
    })
      .then(res => {
        return res.json();
      })
      .then(function(json) {
        for (var i = 0; i < json.data.length; i = i + 1){ cat_json.push(json.data[i]);}
        // console.log(json);
        // console.log(json.data.length)
        
        //console.log("here")

        
      fetch_events();
      //console.log("here1")
      //console.log("here2")
      fetch_results();
      
      add_cat();
  })
}
     

  var fetch_events = () => {
    fetch("https://api.mitrevels.in/events", {
      method: "GET",
      headers: {
        "Content-Type": "application/JSON"
      },
      credentials: "include",
      redirect: "error",
      credentials: "omit"
    })
      .then(res => {
        return res.json();
      })
      .then(function(json) {
        for (var i = 0; i < json.data.length; i = i + 1)
          events_json.push(json.data[i]);
      });
  };
  var fetch_results = () => {
    fetch("https://api.mitrevels.in/results", {
      method: "GET",
      headers: {
        "Content-Type": "application/JSON"
      },
      credentials: "include",
      redirect: "error",
      credentials: "omit"
    })
      .then(res => {
        return res.json();
      })
      .then(function(json) {
        for (var i = 0; i < json.data.length; i = i + 1)
          results_json.push(json.data[i]);   
      });
  };
  var add_cat = () =>{
    // console.log(cat_json.length)
    for (var i = 0; i < cat_json.length; i = i + 1) {
      
      //console.log(json.data[i].name)
      
      if (cat_json[i].type === "CULTURAL") {
          //console.log(json.data[i].name)
        //   console.log(cat_json[i].name);
          cat_select.innerHTML+= '<option value="'+ cat_json[i].id +'">'+ cat_json[i].name +'</option>'
      }
     
  }
  };
  cat_select.addEventListener('click',() =>{
    event_select.innerHTML = "";
    event_name.innerHTML = "";
    cat_name.innerHTML = "/" + cat_select.options[cat_select.selectedIndex].text
     select_cat = cat_select.options[cat_select.selectedIndex].value;
    // console.log(select_cat);
    event_select.style.display = "block";
    for(var i=0;i<events_json.length;i++)
    {
      if(events_json[i].category == select_cat)
      {
        event_select.innerHTML+= '<option value="'+ events_json[i].id +'">'+ events_json[i].name +'</option>'
      }
    }
  })

  event_select.addEventListener('click',() =>{
    round_select.innerHTML = "";
    event_name.innerHTML = event_select.options[event_select.selectedIndex].text;
     select_event = event_select.options[event_select.selectedIndex].value;
   // console.log(results_json);
   // let max = 0;
    
    let flag = 0; 
    for(var i=0;i<results_json.length;i++)
    {
      if(select_event == results_json[i].event)
      {
        flag = ((results_json[i].round > flag) ? results_json[i].round : flag);

      }
    }
  //  console.log(flag)
    if(flag == 0)
    {
      result.innerHTML = "No Result to diplay.";
      round_select.style.display = "none";

    }
    else
    {
      round_select.style.display = "block";
      for(var i=0;i<flag;i++)
      {
        round_select.innerHTML+= '<option value="'+ i+1 +'">'+ i+1 +'</option>'
      }
    }
  })

  var addCard = (pos,id) =>{
    var x = document.createElement("div");
    x.classList.add("rank-team");
    var y = document.createElement("div");
    y.classList.add("rank-column");
    var z = document.createElement("div");
    z.classList.add("team-id");
    var a = document.createElement("div");
    a.classList.add("rank-of-team");
    var b = document.createElement("div");
    b.classList.add("rank-no");
    if(pos == 1)
   { b.innerHTML = "1st";
      y.style.background = "#FCBE47"
      y.style.width = "75%"
  }
    else if(pos == 2)
   { b.innerHTML = "2nd ";
   y.style.background = "#CCCCCB"
   y.style.width = "65%"

  }
    else if(pos == 3)
   { b.innerHTML = "3rd";
   y.style.background = "#CD7F32"
   y.style.width = "55%"
}
    else
   { b.innerHTML = pos+"th";
    y.style.background = "#474747";
    y.style.width = "45%"
  }

    a.innerHTML = "#"+id;
    z.innerHTML = "Team ID";
    y.appendChild(z)
    y.appendChild(a)
    x.appendChild(b)
    x.appendChild(y)
    
    return x;
  }
  
  round_select.addEventListener('click',() =>{
    result.innerHTML = "";
    var round_event = round_select.options[round_select.selectedIndex].value;
    //console.log(round_event)
    for(var i=0;i<results_json.length;i++)
    {
      if(round_event == results_json[i].round && select_event == results_json[i].event) 
      {
        result.appendChild(addCard(results_json[i].position,results_json[i].teamid));
      }
    }

  })

  fetch_cat();  
  
})
