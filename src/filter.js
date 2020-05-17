function filterFunction() {
    var input, filter, a, i, row, tag;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("videos");
    a = div.querySelectorAll(".vid a");
    tag = div.querySelectorAll(".vid .tag")	 	
    row = div.querySelectorAll(".row");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      txtValueTag = tag[i].textContent || tag[i].innerText;
      if ((txtValue.toUpperCase().indexOf(filter) > -1) || (txtValueTag.toUpperCase().indexOf(filter) > -1)) {
        row[i].style.display = "";
      } else {
        row[i].style.display = "none";
      }
    }
  }