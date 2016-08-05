/*
	Compass Teleport
		Version: 1.0
		By Jordi Goyanes
		Follow me on github: github.com/jordigoyanes

	This is 100% JavaScript!


*/
// CONFIGURATION 

var COMPASS_INVENTORY_NAME = "Compass"
var COMPASS_INVENTORY_SIZE = 9 //IT MUST BE MULTIPLE OF 9!! (and no strings)
var LOCATION_CREATED_MESSAGE = "Location succesfully created!"
var LOCATION_DELETED_MESSAGE = "Location deleted"
var LOCATION_ALREADY_EXISTS_MESSAGE = "That location name already exists!"
var LOCATION_DOESNT_EXIST_MESSAGE = "That location name doesn't exist!"
var INVENTORY_IS_FULL_MESSAGE = "Your compass inventory is full! - To delete locations: /tpdelete LocationName"
var PLAYER_NOT_IN_WORLD = "You can only teleport in the normal world!"
var TELEPORTING_MESSAGE = "Teleporting..."
var USAGE_INFO = "Usage: /tpadd myHomeName (no spaces)"

//END OF CONFIGURATION

//below is the plugin code, edit it under your own risk :)

var Bukkit = Packages.org.bukkit.Bukkit;
var Inventory = Packages.org.bukkit.inventory.Inventory;
var ItemStack = Packages.org.bukkit.inventory.ItemStack;
var Material = Packages.org.bukkit.Material;
var ItemMeta = Packages.org.bukkit.inventory.meta.ItemMeta;
var Location = Packages.org.bukkit.Location;
var compassdb = persist('compassdata', {});


function compassInventory(event){
	var p = event.getPlayer();
	var compassInv = Bukkit.createInventory(p, COMPASS_INVENTORY_SIZE, COMPASS_INVENTORY_NAME);
	var action = event.getAction()
	var playerUUID = p.uniqueId;

 	if(p.getItemInHand().getType() == Material.COMPASS){
	    if(action == "RIGHT_CLICK_AIR" || action == "LEFT_CLICK_AIR" || action == "RIGHT_CLICK_BLOCK"){	
			
			var bed = new ItemStack(Material.BED, 1);
			var meta = bed.getItemMeta();
			

			if(compassdb[playerUUID] != undefined && compassdb[playerUUID].compass != undefined){
				for (var locName in compassdb[playerUUID].compass) {
					if(compassdb[playerUUID].compass.hasOwnProperty(locName)){
						if(compassdb[playerUUID].compass[locName] != undefined){
							var coords = [];
							coords.push(compassdb[playerUUID].compass[locName].x.toString());
							coords.push(compassdb[playerUUID].compass[locName].y.toString());
							coords.push(compassdb[playerUUID].compass[locName].z.toString());
							meta.setDisplayName(locName.toString())
							meta.setLore(coords);
							bed.setItemMeta(meta);
							compassInv.addItem(bed);
						}
							
					}
				

				}
							
			}  	
	    	p.openInventory(compassInv);	    	
	    }
	}

}

function compassTeleport(event){
	var compassinv = event.getClickedInventory();
	var clicked = event.getCurrentItem();
	var player = event.getWhoClicked();
	
	if(clicked !=undefined){
		if(compassinv.getName() == COMPASS_INVENTORY_NAME && clicked.getType() != Material.AIR){
			event.setCancelled(true)
			var meta = clicked.getItemMeta();
			var tx = meta.getLore()[0];
			var ty = meta.getLore()[1];
			var tz = meta.getLore()[2];
			player.closeInventory();
			if(player.getWorld().getName() == "world"){
			echo(player, TELEPORTING_MESSAGE.green())
			player.teleport(new Location(player.getWorld(), tx, ty, tz));
			}else{echo(player, PLAYER_NOT_IN_WORLD.red())}
			}
		}
	
}
//defining listeners:
events.playerInteract(compassInventory);
events.inventoryClick(compassTeleport);

//-------------------
//COMMANDS
//-------------------
commando('tpadd', function(args, player){
	if(args[0] != undefined){
		var homeName = args[0];
		var playerUUID = player.uniqueId;
		var tx = player.getLocation().getX();
		var ty = player.getLocation().getY();
		var tz = player.getLocation().getZ();

		length = Object.keys(compassdb[playerUUID].compass).length;
					
		function addLocation(){
			if(length < COMPASS_INVENTORY_SIZE){
				if(compassdb[playerUUID].compass[homeName] == undefined){
					compassdb[playerUUID].compass[homeName] = {};
					compassdb[playerUUID].compass[homeName].x = tx;
					compassdb[playerUUID].compass[homeName].y = ty;
					compassdb[playerUUID].compass[homeName].z = tz;
					echo(player, LOCATION_CREATED_MESSAGE.green())
				}else{echo(player, LOCATION_ALREADY_EXISTS_MESSAGE.red())}
			}else{
				echo(player, INVENTORY_IS_FULL_MESSAGE.red());
			}
		}
		
		if(compassdb[playerUUID] != undefined && compassdb[playerUUID].compass != undefined){
			addLocation();
		}else{
			compassdb[playerUUID] = {};
			compassdb[playerUUID].compass = {};
			addLocation();
		}
	}else{echo(player, USAGE_INFO.red())}

});

commando('tpdel', function(args, player){
	var homeName = args[0];
	var playerUUID = player.uniqueId;
	if(compassdb[playerUUID].compass[homeName] != undefined){
		compassdb[playerUUID].compass[homeName] = undefined;
		echo(player, LOCATION_DELETED_MESSAGE)

	}else{echo(player, LOCATION_DOESNT_EXIST_MESSAGE.red())}
});