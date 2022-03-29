"use strict";

function importStudent() {

    var name = document.getElementById("name").value;
    var id = document.getElementById("id").value;
    var points = document.getElementById("points").value;
    var grade;
    var grades = document.getElementsByClassName("grade");
    for(var i=0;i<grades.length;i++) {
        if(grades[i].checked) {
            grade = grades[i].value;
        }
    }
    //console.log(grade);
    var session = document.getElementById("session").value;

    if(name==""||id==""||points==""||grade==""||session=="") {
        alert("Please fill in the required fields.");
    }

    else {
        var tableRow = document.getElementById("tabela").getElementsByTagName("tbody")[0];
        var newRow = tableRow.insertRow(tableRow.rows.length);

        var cell0 = newRow.insertCell(0);
        cell0.innerHTML = name;

        var cell1 = newRow.insertCell(1);
        cell1.innerHTML = id;

        var cell2 = newRow.insertCell(2);
        cell2.innerHTML = points;

        var cell3 = newRow.insertCell(3);
        cell3.innerHTML = grade;
        cell3.setAttribute('name', 'ocenki');
        // cell3.name = 'ocenki';

        var cell4 = newRow.insertCell(4);
        cell4.innerHTML = session;

        var cell5 = newRow.insertCell(5);

        var btn1 = document.createElement("button");
        var t1 = document.createTextNode("Confirm");
        btn1.append(t1);
        btn1.setAttribute('onclick', 'paint(this)');
        cell5.append(btn1);

        var btn2 = document.createElement("button");
        var t2 = document.createTextNode("Revert");
        btn2.append(t2);
        btn2.setAttribute('onclick', 'remove(this)');
        cell5.append(btn2);

        average();

        document.getElementById("name").value = "";
        document.getElementById("id").value = "";
        document.getElementById("points").value = "";
        document.getElementsByClassName("grade").value="";
        document.getElementById("session").value = "";


        if(typeof(Storage) !== "undefined") {
            if(sessionStorage.clickcount) {
                sessionStorage.clickcount = Number(sessionStorage.clickcount) + 1;
            } else {
                sessionStorage.clickcount = 1;
            }
            document.getElementById("result").innerHTML = "You have entered " + sessionStorage.clickcount + " student(s) in this session.";
        } else {
            document.getElementById("result").innerHTML = "The browser does not support web storage..";
        }
    
        //console.log(sessionStorage.clickcount);
    }
}

function average() {

    var ocenki = document.getElementsByName("ocenki");
    var sum = 0;
    for(var i=0;i<ocenki.length;i++)
        sum = sum + parseFloat(ocenki[i].innerHTML);
    var average = parseFloat(sum) / parseFloat(ocenki.length);
    document.getElementById("average").innerHTML = "Average grade: " + average;
}

function paint(ref) {

    var tr = ref.parentNode.parentNode;
    tr.style.backgroundColor = 'lightgreen';
    ref.setAttribute('disabled', true);
    ref.parentNode.lastElementChild.setAttribute('disabled', true);

}

function remove(ref) {
    
    var tr = ref.parentNode.parentNode;
    tr.parentNode.removeChild(tr);
    average();

}