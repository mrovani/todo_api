var itemTemplate = $('#templates .item')
var list = $('#list')
// const baseURL = 'https://afternoon-lowlands-10880.herokuapp.com/lists/1'
const baseURL = '/lists/1'

var loadRequest = $.ajax({
  type: 'GET',
  url: baseURL + '/items'
})

loadRequest.done(function(data) {
  var itemsData = data
  itemsData.forEach((itemData) => {
    addItemToPage(itemData)
  })
})

function addItemToPage(itemData) {
  var item = itemTemplate.clone()
  item.attr('data-id', itemData.id)

  item.find('.description').text(itemData.description)

  if(itemData.completed) {
    item.addClass('completed')
  }
  list.append(item)
}

// When the user loads the page, our code will start listening for when the user submits the form at the top of the page.
$('#add-form').on('submit', function(event) {
  var itemDescription = event.target.itemDescription.value

  // We will make an AJAX request to our server, creating an item with the description our user just provided.
  var creationRequest = $.ajax({
    type: 'POST',
    url: baseURL + '/items',
    data: { item: {description: itemDescription, completed: false}}
  })
  // Finally, we need to add the new item to the list. We'll use our addItemToPage function again to do so.
  creationRequest.done(function(itemDataFromServer) {
    addItemToPage(itemDataFromServer)
  })
  // When a user submits the form (by pressing enter), we will prevent the page from refreshing, which is the normal behavior for a form.
  event.preventDefault()
  // resets the page after new item is entered.
  event.target.reset()
})

// First off, the event listener is slightly more complex. Instead of binding a listener to a single form (like we did in the last lesson), we'll be binding a listener to every check mark in the list. jQuery's .on function allows you to do this, using event delegation.
list.on('click', '.complete-button', function(event) {

  // Secondly, it will be slightly harder to get the required information from the page when the user clicks a check mark. We need to know which item they clicked, its id (so the server can identify it), and whether it has been completed or not.
  var item = $(event.target).parent()
  var isItemCompleted = item.hasClass('completed')
  var itemId = item.attr('data-id')

  // Next, make a server request to update the information using a "PUT" request
  var updateRequest = $.ajax({
    type: 'PUT',
    url: baseURL + "/items/" + itemId,
    data: {item: { completed: !isItemCompleted }}
  })

  // Finally, we'll update the item that has been marked as incomplete or complete. Instead of creating a new item, we'll simple add or remove the class 'completed' from the specified item (using jQuery's helpful addClass and removeClass functions). This will cause the browser to render the item differently, based on the rules written in styles.css.
  updateRequest.done(function(itemData) {
    if (itemData.completed) {
      item.addClass('completed')
    } else {
      item.removeClass('completed')
    }
  })
})


// Delete items when you click the "X"
list.on('click', '.delete-button', function(event) {
  var item = $(event.target).parent()
  var itemId = item.attr('data-id')

  var deleteRequest = $.ajax({
    type: 'DELETE',
    url: baseURL + "/items/" + itemId
  })

  deleteRequest.done(function() {
    item.remove()
  })
})
