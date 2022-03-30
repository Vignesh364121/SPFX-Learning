import { sp } from "@pnp/sp/presets/all";

let itemLimit = 5000;


//get all the items in the list regardless of its size
const PnPGetGroup = (groupName, context) => {
     sp.setup({
          spfxContext: context
     });

     return sp.web.siteGroups.getByName(groupName).users.get()
}


//get all the items in the list regardless of its size
const PnPGetAll = (listName, context) => {
     sp.setup({
          spfxContext: context
     });

     return sp.web.lists.getByTitle(listName).items.getAll();
}

//get list item item by filter
const PnPGetItems = (listName, select, expand, filter, context) => {
     sp.setup({
          spfxContext: context
     });

     return sp.web.lists.getByTitle(listName).items.select(select).expand(expand).filter(filter).top(itemLimit).get();
}

//get list item by item ID
const PnPGetByID = (listName, itemID, select, expand, context) => {
     sp.setup({
          spfxContext: context
     });

     return sp.web.lists.getByTitle(listName).items.getById(itemID).select(select).expand(expand).get();
}

//add list item
const PnPAddItem = (listName, postItem, context) => {
     sp.setup({
          spfxContext: context
     });

     return sp.web.lists.getByTitle(listName).items.add(postItem);
}

//add list item
const PnPUpdateItem = (listName, itemID, postItem, context) => {
     sp.setup({
          spfxContext: context
     });

     return sp.web.lists.getByTitle(listName).items.getById(itemID).update(postItem);
}


//add list attachments
const PnPAddAttachments = (itemID, fileInfos, listName, context) => {
     sp.setup({
          spfxContext: context
     });

     return sp.web.lists.getByTitle(listName).items.getById(itemID).attachmentFiles.addMultiple(fileInfos);
}


export { PnPGetGroup, PnPGetAll, PnPGetItems, PnPGetByID, PnPAddItem, PnPUpdateItem, PnPAddAttachments }