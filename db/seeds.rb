# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


#FOR-LOOP TO CREATE 30 NEW USERS FROM FAKER GEMFILES ON GITHUB
30.times do
  firstname = Faker::Name.first_name
  lastname = Faker::Name.last_name
  email = Faker::Internet.email(firstname + lastname)
  password = 'password'
  User.create({
    name: firstname + ' ' + lastname,
    email: email,
    password: password,
  })
end

30.times do
  listname = Faker::Food.dish
  list = List.create({
    name: listname,
    })


    10.times do
      item = Faker::Food.ingredient
      completed = Faker::Boolean.boolean
      Item.create ({
        list_id: list.id,
        description: item,
        completed: completed,
        })

    end

end
