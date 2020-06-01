# XML to JSON

> Convert XML from clipboard or current document/selection to JSON

[![Version](https://img.shields.io/visual-studio-marketplace/v/buianhthang.xml2json?style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=buianhthang.xml2json) ![Installs](https://img.shields.io/visual-studio-marketplace/i/buianhthang.xml2json?style=for-the-badge) ![Downloads](https://img.shields.io/visual-studio-marketplace/d/buianhthang.xml2json?style=for-the-badge) ![Rating](https://img.shields.io/visual-studio-marketplace/r/buianhthang.xml2json?style=for-the-badge)

Are you using [Code](https://code.visualstudio.com/) and working with XML builder tools day by day?

XML to JSON can help you create the final object, just edit the variables that need dynamic data instead of typing each object key, attribute and no typos mistake. Converted data can be use for [xmlbuilder](https://www.npmjs.com/package/xmlbuilder), [xml2js](https://npmjs.com/package/xml2js) or your expected format using configuration options.

Here are just some of the features that XML to JSON provides:
- Convert XML from document or selection to JSON
- Convert XML from clipboard to JSON

## 📝 Changelog
See the [release notes](https://github.com/buianhthang/vscode-xml2json/blob/master/CHANGELOG.md "Open Release Notes") for the full set of changes

## 🏙 Preview

<p align="center">
  <img src="https://github.com/buianhthang/vscode-xml2json/raw/master/images/preview.gif" alt="png">
</p>

## 🔧 Configuration

By default, it's following `xml2js` default options. If you wanna change, choose one of pre-defined options (eg: `xmlbuilder`) or select `custom` and edit in `settings.json`. Below is an example:
```json
{
    "xml2json.defaultSettings": "custom",
    "xml2json.options": {
        "attrkey": "@",
        "explicitArray": false,
        "mergeAttrs": true
    }
}
```

**Availablie options:**
> Following [xml2js](https://npmjs.com/package/xml2js)

|Name | Default | Description
|-----|---------|------------
attrkey|$|Prefix that is used to access the attributes. Version 0.1 default was @.
charkey|_|Prefix that is used to access the character content. Version 0.1 default was #.
explicitCharkey|false|
trim|false|Trim the whitespace at the beginning and end of text nodes.
normalizeTags|false|Normalize all tag names to lowercase.
normalize|false|Trim whitespaces inside text nodes.
explicitRoot|true|Set this if you want to get the root node in the resulting object.
emptyTag||what will the value of empty nodes be.
explicitArray|true|Always put child nodes in an array if true; otherwise an array is created only if there is more than one.
ignoreAttrs|false|Ignore all XML attributes and only create text nodes.
mergeAttrs|false|Merge attributes and child elements as properties of the parent, instead of keying attributes off a child attribute object. This option is ignored if ignoreAttrs is false.
validator|null|You can specify a callable that validates the resulting structure somehow, however you want. See unit tests for an example.
xmlns|false|Give each element a field usually called '$ns' (the first character is the same as attrkey) that contains its local name and namespace URI.
explicitChildren|false|Put child elements to separate property. Doesn't work with mergeAttrs = true. If element has no children then children won't be created. Added in 0.2.5.
childkey|$$|Prefix that is used to access child elements if explicitChildren is set to true. Added in 0.2.5.
preserveChildrenOrder|false|Modifies the behavior of explicitChildren so that the value of the children property becomes an ordered array. When this is true, every node will also get a #name field whose value will correspond to the XML nodeName, so that you may iterate the children array and still be able to determine node names. The named (and potentially unordered) properties are also retained in this configuration at the same level as the ordered children array. Added in 0.4.9.
charsAsChildren|false|Determines whether chars should be considered children if explicitChildren is on. Added in 0.2.5.
includeWhiteChars|false|Determines whether whitespace-only text nodes should be included. Added in 0.4.17.
async|false|Should the callbacks be async? This might be an incompatible change if your code depends on sync execution of callbacks. Future versions of xml2js might change this default, so the recommendation is to not depend on sync execution anyway. Added in 0.2.6.
strict|true|Set sax-js to strict or non-strict parsing mode. Defaults to true which is highly recommended, since parsing HTML which is not well-formed XML might yield just about anything. Added in 0.2.7.
attrNameProcessors(*)|null|Allows the addition of attribute name processing functions. Accepts an Array of functions. Added in 0.4.14.
attrValueProcessors(*)|null|Allows the addition of attribute value processing functions. Accepts an Array of functions. Added in 0.4.1.
tagNameProcessors(*)|null|Allows the addition of tag name processing functions. Accepts an Array of functions. Added in 0.4.1.
valueProcessors(*)|null|Allows the addition of element value processing functions. Accepts an Array of functions. Added in 0.4.6.

### Note
(*): These configuration is not supported this time due to Code extension only support `array`, `boolean`, `integer`, `null`, `number`, `object`, `string`.

## 📸 Screenshots

<p align="center">
  <img src="https://github.com/buianhthang/vscode-xml2json/raw/master/images/command.png" alt="png"> <img src="https://github.com/buianhthang/vscode-xml2json/raw/master/images/context.png" alt="png">
</p>

## 📝 Icon Credit
XML, JSON file icon by [Smashicons] from [Flaticon] - [Flaticon Basic License]

[Flaticon]: https://www.flaticon.com
[Smashicons]: https://www.flaticon.com/authors/smashicons
[Flaticon Basic License]: https://file000.flaticon.com/downloads/license/license.pdf