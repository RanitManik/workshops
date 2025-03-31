package main

import "fmt"

type Item struct {
	Name string
	Type string
}
type Player struct {
	Name      string
	Inventory []Item
}

func main() {

	player := Player{
		Name: "John Doe",
		Inventory: []Item{
			{
				Name: "Ranit",
				Type: "user",
			},
		},
	}

	fmt.Println("initial Player", player)

	player.addItemToPlayerInventory("Tatai")
	fmt.Println("Player after adding Item", player)

	player.dropItemToPlayerInventory("Ranit")
	fmt.Println("Player after dropping Item", player)

	player.useItemFromPlayerInventory()

}

func (p *Player) addItemToPlayerInventory(itemName string) {
	p.Inventory = append(p.Inventory, Item{
		Name: itemName,
		Type: "Player",
	})
}

func (p *Player) dropItemToPlayerInventory(itemName string) {
	for index, item := range p.Inventory {
		if item.Name == itemName {
			p.Inventory = append(p.Inventory[:index], p.Inventory[index+1:]...)
		}
	}
}

func (p *Player) useItemFromPlayerInventory() {
	fmt.Println("Using Item", p.Inventory)
}
