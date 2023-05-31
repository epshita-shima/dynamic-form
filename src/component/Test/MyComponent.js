import React from "react";
import Swal from "sweetalert2";
import './MyComponent.css';
import Select from "react-select";

function MyComponent() {

  var data = [
    {
      id: 1,
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv",
      address: {
        street: "Victor Plains",
        suite: "Suite 879",
        city: "Wisokyburgh",
        zipcode: "90566-7771",
        geo: {
          lat: "-43.9509",
          lng: "-34.4618",
        },
      },
      phone: "010-692-6593 x09125",
      website: "anastasia.net",
      company: {
        name: "Deckow-Crist",
        catchPhrase: "Proactive didactic contingency",
        bs: "synergize scalable supply-chains",
      },
    },
    {
      id: 2,
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv",
      address: {
        street: "Victor Plains",
        suite: "Suite 879",
        city: "Wisokyburgh",
        zipcode: "90566-7771",
        geo: {
          lat: "-43.9509",
          lng: "-34.4618",
        },
      },
      phone: "010-692-6593 x09125",
      website: "anastasia.net",
      company: {
        name: "Deckow-Crist",
        catchPhrase: "Proactive didactic contingency",
        bs: "synergize scalable supply-chains",
      },
    },
    {
      id: 3,
      name: "Clementine Bauch",
      username: "Samantha",
      email: "Nathan@yesenia.net",
      address: {
        street: "Douglas Extension",
        suite: "Suite 847",
        city: "McKenziehaven",
        zipcode: "59590-4157",
        geo: {
          lat: "-68.6102",
          lng: "-47.0653",
        },
      },
      phone: "1-463-123-4447",
      website: "ramiro.info",
      company: {
        name: "Romaguera-Jacobson",
        catchPhrase: "Face to face bifurcated interface",
        bs: "e-enable strategic applications",
      },
    },
    {
      id: 4,
      name: "Patricia Lebsack",
      username: "Karianne",
      email: "Julianne.OConner@kory.org",
      address: {
        street: "Hoeger Mall",
        suite: "Apt. 692",
        city: "South Elvis",
        zipcode: "53919-4257",
        geo: {
          lat: "29.4572",
          lng: "-164.2990",
        },
      },
      phone: "493-170-9623 x156",
      website: "kale.biz",
      company: {
        name: "Robel-Corkery",
        catchPhrase: "Multi-tiered zero tolerance productivity",
        bs: "transition cutting-edge web services",
      },
    },
    {
      id: 5,
      name: "Chelsey Dietrich",
      username: "Kamren",
      email: "Lucio_Hettinger@annie.ca",
      address: {
        street: "Skiles Walks",
        suite: "Suite 351",
        city: "Roscoeview",
        zipcode: "33263",
        geo: {
          lat: "-31.8129",
          lng: "62.5342",
        },
      },
      phone: "(254)954-1289",
      website: "demarco.info",
      company: {
        name: "Keebler LLC",
        catchPhrase: "User-centric fault-tolerant solution",
        bs: "revolutionize end-to-end systems",
      },
    },
    {
      id: 6,
      name: "Mrs. Dennis Schulist",
      username: "Leopoldo_Corkery",
      email: "Karley_Dach@jasper.info",
      address: {
        street: "Norberto Crossing",
        suite: "Apt. 950",
        city: "South Christy",
        zipcode: "23505-1337",
        geo: {
          lat: "-71.4197",
          lng: "71.7478",
        },
      },
      phone: "1-477-935-8478 x6430",
      website: "ola.org",
      company: {
        name: "Considine-Lockman",
        catchPhrase: "Synchronised bottom-line interface",
        bs: "e-enable innovative applications",
      },
    },
    {
      id: 7,
      name: "Kurtis Weissnat",
      username: "Elwyn.Skiles",
      email: "Telly.Hoeger@billy.biz",
      address: {
        street: "Rex Trail",
        suite: "Suite 280",
        city: "Howemouth",
        zipcode: "58804-1099",
        geo: {
          lat: "24.8918",
          lng: "21.8984",
        },
      },
      phone: "210.067.6132",
      website: "elvis.io",
      company: {
        name: "Johns Group",
        catchPhrase: "Configurable multimedia task-force",
        bs: "generate enterprise e-tailers",
      },
    },
    {
      id: 8,
      name: "Nicholas Runolfsdottir V",
      username: "Maxime_Nienow",
      email: "Sherwood@rosamond.me",
      address: {
        street: "Ellsworth Summit",
        suite: "Suite 729",
        city: "Aliyaview",
        zipcode: "45169",
        geo: {
          lat: "-14.3990",
          lng: "-120.7677",
        },
      },
      phone: "586.493.6943 x140",
      website: "jacynthe.com",
      company: {
        name: "Abernathy Group",
        catchPhrase: "Implemented secondary concept",
        bs: "e-enable extensible e-tailers",
      },
    },
    {
      id: 9,
      name: "Glenna Reichert",
      username: "Delphine",
      email: "Chaim_McDermott@dana.io",
      address: {
        street: "Dayna Park",
        suite: "Suite 449",
        city: "Bartholomebury",
        zipcode: "76495-3109",
        geo: {
          lat: "24.6463",
          lng: "-168.8889",
        },
      },
      phone: "(775)976-6794 x41206",
      website: "conrad.com",
      company: {
        name: "Yost and Sons",
        catchPhrase: "Switchable contextually-based project",
        bs: "aggregate real-time technologies",
      },
    },
    {
      id: 10,
      name: "Clementina DuBuque",
      username: "Moriah.Stanton",
      email: "Rey.Padberg@karina.biz",
      address: {
        street: "Kattie Turnpike",
        suite: "Suite 198",
        city: "Lebsackbury",
        zipcode: "31428-2261",
        geo: {
          lat: "-38.2386",
          lng: "57.2232",
        },
      },
      phone: "024-648-3804",
      website: "ambrose.net",
      company: {
        name: "Hoeger LLC",
        catchPhrase: "Centralized empowering task-force",
        bs: "target end-to-end models",
      },
    },
  ];

  document.ondragstart = function (event, i) {
    
      
        console.log(event);
    if(event.target.nodeName=="TH"){

      var allelement = document.querySelectorAll('.droptargettd');
      console.log(event.target.parentElement.id);
        allelement.forEach(element => {
          element.style.display = 'block';
        });
      event.dataTransfer.setData("Text", event.target.className);

    }    
    else{
      var allelement = document.querySelectorAll('.droptarget');
      console.log(event.target.parentElement.id);
        allelement.forEach(element => {
          element.style.display = 'block';
        });
  
        allelement = document.querySelectorAll('.dropAftertarget');
        console.log(event.target.parentElement.id);
          allelement.forEach(element => {
            element.style.display = 'block';
          });
      event.dataTransfer.setData("Text", event.target.id);
    }
   
    
  };

  document.ondragover = function (event) {
    event.preventDefault();
  };

  document.ondrop = function (event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("Text");   
    console.log(document.getElementsByClassName(data)[0].nodeName);

    if(document.getElementsByClassName(data)[0].nodeName=="TH"){
      if (event.target.className == "droptargettd border") {
        
        var allelement = document.querySelectorAll('.droptargettd');
        allelement.forEach(element => {
          element.style.display = 'none';
        });
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Position?',
        text: "Where to put the data?",
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Right',
        cancelButtonText: 'Left',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          insertBeforeth(document.getElementsByClassName(data), event.target.parentElement.className);
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          insertAfterth(document.getElementsByClassName(data), event.target.parentElement.className);
        }
      })
    }
    }
    else{
      var allelement = document.querySelectorAll('.droptarget');
      allelement.forEach(element => {
        element.style.display = 'none';
      });
  
      allelement = document.querySelectorAll('.dropAftertarget');
      allelement.forEach(element => {
        element.style.display = 'none';
      });
      console.log(event.target.className)
      if (event.target.className == "droptarget border") {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        })
        
        swalWithBootstrapButtons.fire({
          title: 'Position?',
          text: "Where to put the data?",
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'Right',
          cancelButtonText: 'Left',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            insertBefore(document.getElementById(data), event.target.parentElement.id);
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            insertAfter(document.getElementById(data), event.target.parentElement.id);
          }
        })
      }
      
  
      document.getElementsByClassName("droptarget").className ="d-none";
    }

    
  };
  function insertBefore(newNode, refNode) {
    console.log(newNode,refNode,document.getElementById(refNode).nextSibling)
    document.getElementById(refNode).parentNode.insertBefore(newNode, document.getElementById(refNode).nextSibling);

  }
  function insertAfter(newNode, refNode) {
    console.log(newNode,refNode,document.getElementById(refNode).nextSibling)
    document.getElementById(refNode).parentNode.insertBefore(newNode, document.getElementById(refNode));
  }

  function insertAfterth(newNode, refNode) {
    
    console.log(refNode)
    var allelement = document.getElementsByClassName(refNode);
    var arr = [...allelement];
    
    arr.forEach((element,i) => {
        element.parentNode.insertBefore(newNode[i], element);
      });
  }
  function insertBeforeth(newNode, refNode) {
    
    console.log(refNode)
    var allelement = document.getElementsByClassName(refNode);
    var arr = [...allelement];
    
    arr.forEach((element,i) => {
        element.parentNode.insertBefore(newNode[i], element.nextSibling);
      });
  }

  return (
    <>
      <table class="table">
        <thead>
          <tr>
            <th scope="col" class="dropTh0 border" draggable="true">Index <div class="droptargettd border" style={{display:"none"}} draggable="false">Drop</div></th>
            <th scope="col" class="dropTh1 border" draggable="true">First <div class="droptargettd border" style={{display:"none"}} draggable="false">Drop</div></th>
            <th scope="col" class="dropTh2 border" draggable="true">Last <div class="droptargettd border" style={{display:"none"}} draggable="false">Drop</div></th>
            <th scope="col" class="dropTh3 border" draggable="true">Test <div class="droptargettd border" style={{display:"none"}} draggable="false">Drop</div></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index} id={index}  class="border">
                <td class="dropTh0 border" draggable="true" id={`item350${index}`}>
                  <div draggable="false">a</div>
                  <div class="droptarget border" style={{display:"none"}} draggable="false">Drop</div>                
                </td>                                                                                               
                <td class="dropTh1 border" draggable="true" id={`item351${index}`}>
                  <div draggable="false">b</div>
                  <div class="droptarget border" style={{display:"none"}} draggable="false">Drop</div>
                </td>
                <td  class="dropTh2 border" draggable="true" id={`item352${index}`}>
                  <div draggable="false">c</div>
                  <div class="droptarget border" style={{display:"none"}} draggable="false">Drop</div>
                  </td>
                <td  class="dropTh3 border" draggable="true" id={`item353${index}`}>
                  <div draggable="false">
                  <Select
                          class="form-select"
                          className="w-[100%]"
                          aria-label="Default select example"
                          placeholder="Select supplier type"
                          required
                          name="supplierType"
                        ></Select>
                  </div>
                  <div class="droptarget border" style={{display:"none"}} draggable="false">Drop</div>
                  </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default MyComponent;
