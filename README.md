# teleportGUI

TeleportGUI is a Minecraft plugin that enables users to teleport using a friendly GUI using a compass.
Just click your compass in hand to open the compass inventory to choose a registered location.  

This plugin has been proudly written in JavaScript, a language so popular that now is able to use the full Bukkit API to make minecraft plugins, making things easier and faster.  



# Instructions

-Download ScriptCraft (http://www.scriptcraftjs.org) and paste the .jar file on the plugins folder located inside your server's root folder. This will generate a new folder called "ScriptCraft" inside that root folder.  

-Add our js plugin file inside ServerRootFolder/ScriptCraft/plugins 

-Reload the server with the /reload command

-Enjoy  


# Usage
**/tpadd locationName**  
This will register a new location with the player's coordinates to the compass inventory.   
**/tpdel locationName**  
This will delete a location. This is useful if your compass inventory is running out of slots. Inventory size can be changed editing the variable `COMPASS_INVENTORY_SIZE` inside teleportGUI.js

# Configuration  
There are 9 variables that you can edit, all strings except `COMPASS_INVENTORY_SIZE`:  
`COMPASS_INVENTORY_NAME`  
`COMPASS_INVENTORY_SIZE`**int**  
`LOCATION_CREATED_MESSAGE`  
`LOCATION_DELETED_MESSAGE`  
`LOCATION_ALREADY_EXISTS_MESSAGE`  
`LOCATION_DOESNT_EXIST_MESSAGE`  
`INVENTORY_IS_FULL_MESSAGE`  
`PLAYER_NOT_IN_WORLD`  
`TELEPORTING_MESSAGE`  
`USAGE_INFO`  
