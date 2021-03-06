let test = require('tape');
let xl = require('../distribution/index.js');
let Style = require('../distribution/lib/style');
let xmlbuilder = require('xmlbuilder');

test('Create New Style', (t) => {
    t.plan(1);
    let wb = new xl.Workbook();
    let style = wb.createStyle();

    t.ok(style instanceof Style, 'Correctly generated Style object');
});

test('Set Style Properties', (t) => {
    t.plan();

    let wb = new xl.Workbook();
    let style = wb.createStyle({
        alignment: { 
            horizontal: 'center',
            indent: 1, // Number of spaces to indent = indent value * 3
            justifyLastLine: true,
            readingOrder: 'leftToRight', 
            relativeIndent: 1, // number of additional spaces to indent
            shrinkToFit: false,
            textRotation: 0, // number of degrees to rotate text counter-clockwise
            vertical: 'bottom',
            wrapText: true
        },
        font: {
            bold: true,
            color: 'Black',
            condense: false,
            extend: false,
            family: 'Roman',
            italics: true,
            name: 'Courier',
            outline: true,
            scheme: 'major', // §18.18.33 ST_FontScheme (Font scheme Styles)
            shadow: true,
            strike: true,
            size: 14,
            underline: true,
            vertAlign: 'subscript' // §22.9.2.17 ST_VerticalAlignRun (Vertical Positioning Location)
        },
        border: { // §18.8.4 border (Border)
            left: {
                style: 'thin',
                color: '#444444'
            },
            right: {
                style: 'thin',
                color: '#444444'
            },
            top: {
                style: 'thin',
                color: '#444444'
            },
            bottom: {
                style: 'thin',
                color: '#444444'
            },
            diagonal: {
                style: 'thin',
                color: '#444444'
            },
            diagonalDown: true,
            outline: true
        },
        fill: { // §18.8.20 fill (Fill)
            type: 'pattern',
            patternType: 'solid',
            fgColor: 'Yellow'
        },
        numberFormat: '0.00##%' // §18.8.30 numFmt (Number Format)
    });

    t.ok(style instanceof Style, 'Style object successfully created');

    let styleObj = style.toObject();
    t.ok(styleObj.alignment.horizontal === 'center', 'alignment.horizontal correctly set');
    t.ok(styleObj.alignment.indent === 1, 'alignment.indent correctly set');
    t.ok(styleObj.alignment.justifyLastLine === true, 'alignment.justifyLastLine correctly set');
    t.ok(styleObj.alignment.readingOrder === 'leftToRight', 'alignment.readingOrder correctly set');
    t.ok(styleObj.alignment.relativeIndent === 1, 'alignment.relativeIndent correctly set');
    t.ok(styleObj.alignment.shrinkToFit === false, 'alignment.shrinkToFit correctly set');
    t.ok(styleObj.alignment.textRotation === 0, 'alignment.textRotation correctly set');
    t.ok(styleObj.alignment.vertical === 'bottom', 'alignment.vertical correctly set');
    t.ok(styleObj.alignment.wrapText === true, 'alignment.wrapText correctly set');
    t.ok(styleObj.font.bold === true, 'font.bold correctly set');
    t.ok(styleObj.font.color === 'FF000000', 'font.color correctly set');
    t.ok(styleObj.font.condense === false, 'font.condense correctly set');
    t.ok(styleObj.font.extend === false, 'font.extend correctly set');
    t.ok(styleObj.font.family === 'Roman', 'font.family correctly set');
    t.ok(styleObj.font.italics === true, 'font.italics correctly set');
    t.ok(styleObj.font.name === 'Courier', 'font.name correctly set');
    t.ok(styleObj.font.outline === true, 'font.outline correctly set');
    t.ok(styleObj.font.scheme === 'major', 'font.scheme correctly set');
    t.ok(styleObj.font.shadow === true, 'font.shadow correctly set');
    t.ok(styleObj.font.strike === true, 'font.strike correctly set');
    t.ok(styleObj.font.size === 14, 'font.size correctly set');
    t.ok(styleObj.font.underline === true, 'font.underline correctly set');
    t.ok(styleObj.font.vertAlign === 'subscript', 'font.vertAlign correctly set');
    t.ok(styleObj.border.left.style === 'thin', 'border.left.style correctly set');
    t.ok(styleObj.border.left.color === 'FF444444', 'border.left.color correctly set');
    t.ok(styleObj.border.right.style === 'thin', 'border.right.style correctly set');
    t.ok(styleObj.border.right.color === 'FF444444', 'border.right.color correctly set');
    t.ok(styleObj.border.top.style === 'thin', 'border.top.style correctly set');
    t.ok(styleObj.border.top.color === 'FF444444', 'border.top.color correctly set');
    t.ok(styleObj.border.bottom.style === 'thin', 'border.bottom.style correctly set');
    t.ok(styleObj.border.bottom.color === 'FF444444', 'border.bottom.color correctly set');
    t.ok(styleObj.border.diagonal.style === 'thin', 'border.diagonal.style correctly set');
    t.ok(styleObj.border.diagonal.color === 'FF444444', 'border.diagonal.color correctly set');
    t.ok(styleObj.border.diagonalDown === true, 'border.diagonalDown correctly set');
    t.ok(styleObj.border.diagonalUp === undefined, 'border.diagonalUp correctly not set');
    t.ok(styleObj.border.outline === true, 'border.outline correctly set');
    t.ok(styleObj.fill.type === 'pattern', 'fill.type correctly set');
    t.ok(styleObj.fill.patternType === 'solid', 'fill.patternType correctly set');
    t.ok(styleObj.fill.fgColor === 'FFFFFF00', 'fill.fgColor correctly set');
    t.ok(styleObj.fill.bgColor === undefined, 'fill.bgColor correctly not set');

    let alignmentXMLele = xmlbuilder.create('test');
    style.alignment.addToXMLele(alignmentXMLele);
    let alignmentXMLString = alignmentXMLele.doc().end();
    t.ok(alignmentXMLString === '<?xml version="1.0"?><test><alignment horizontal="center" indent="1" justifyLastLine="1" readingOrder="leftToRight" relativeIndent="1" textRotation="0" vertical="bottom" wrapText="1"/></test>', 'Alignment XML generated successfully');

    let fontXMLele = xmlbuilder.create('test');
    style.font.addToXMLele(fontXMLele);
    let fontXMLString = fontXMLele.doc().end();
    t.ok(fontXMLString === '<?xml version="1.0"?><test><font><sz val="14"/><color rgb="FF000000"/><name val="Courier"/><family val="1"/><scheme val="major"/><b/><i/><outline/><shadow/><strike/><u/></font></test>', 'font xml created successfully');

    let fillXMLele = xmlbuilder.create('test');
    style.fill.addToXMLele(fillXMLele);
    let fillXMLString = fillXMLele.doc().end();
    t.ok(fillXMLString === '<?xml version="1.0"?><test><patternFill patternType="solid"><fgColor rgb="FFFFFF00"/></patternFill></test>', 'Fill xml created successfully');

    let borderXMLele = xmlbuilder.create('test');
    style.border.addToXMLele(borderXMLele);
    let borderXMLString = borderXMLele.doc().end();
    t.ok(borderXMLString === '<?xml version="1.0"?><test><border outline="1" diagonalDown="1"><left style="thin"><color rgb="FF444444"/></left><right style="thin"><color rgb="FF444444"/></right><top style="thin"><color rgb="FF444444"/></top><bottom style="thin"><color rgb="FF444444"/></bottom><diagonal style="thin"><color rgb="FF444444"/></diagonal></border></test>', 'Border xml created successfully');

    t.end();
});

test('Update style on Cell', (t) => {

    let wb = new xl.Workbook({ logLevel: 5 });
    let ws = wb.addWorksheet('Sheet1');
    let style = wb.createStyle({
        font: {
            size: 14,
            name: 'Helvetica',
            underline: true
        }
    });
    ws.cell(1, 1).string('string').style(style);
    let styleID = ws.cell(1, 1).cells[0].s;
    let thisStyle = wb.styles[styleID];
    t.equals(thisStyle.toObject().font.name, 'Helvetica', 'Cell correctly set to style font.');
    t.equals(thisStyle.toObject().font.underline, true, 'Cell correctly set to style font underline.');

    ws.cell(1, 1).style({
        font: {
            name: 'Courier',
            underline: false
        }
    });
    let styleID2 = ws.cell(1, 1).cells[0].s;
    let thisStyle2 = wb.styles[styleID2];
    t.equal(thisStyle2.toObject().font.name, 'Courier', 'Cell font name correctly updated to new font name');
    t.equal(thisStyle2.toObject().font.size, 14, 'Cell font size correctly did not change');
    t.equal(thisStyle2.toObject().font.underline, false, 'Cell font underline correctly unset');

    t.end();
});

test('Validate borders on cellBlocks', (t) => {
    let wb = new xl.Workbook();
    let ws = wb.addWorksheet('Sheet1');
    let style = wb.createStyle({
        border: {
            left: {
                style: 'thin',
                color: '#444444'
            },
            right: {
                style: 'thin',
                color: '#444444'
            },
            top: {
                style: 'thin',
                color: '#444444'
            },
            bottom: {
                style: 'thin',
                color: '#444444'
            }
        }
    });
    let style2 = wb.createStyle({
        border: {
            left: {
                style: 'thin',
                color: '#444444'
            },
            right: {
                style: 'thin',
                color: '#444444'
            },
            top: {
                style: 'thin',
                color: '#444444'
            },
            bottom: {
                style: 'thin',
                color: '#444444'
            },
            outline: true
        }
    });

    ws.cell(2, 2, 5, 3).style(style);
    ws.cell(2, 5, 5, 6).style(style2);

    t.ok(wb.styles[ws.cell(2,2).cells[0].s].border.left !== undefined, 'Left side of top left cell should have a border if outline is set to false');
    t.ok(wb.styles[ws.cell(2,2).cells[0].s].border.right !== undefined, 'Right side of top left cell should have a border if outline is set to false');
    t.ok(wb.styles[ws.cell(2,2).cells[0].s].border.top !== undefined, 'Top side of top left cell should have a border if outline is set to false');
    t.ok(wb.styles[ws.cell(2,2).cells[0].s].border.bottom !== undefined, 'Bottom side of top left cell should have a border if outline is set to false');

    t.ok(wb.styles[ws.cell(2,5).cells[0].s].border.left !== undefined, 'Left side of top left cell should have a border if outline is set to true');
    t.ok(wb.styles[ws.cell(2,5).cells[0].s].border.top !== undefined, 'Top side of top left cell should have a border if outline is set to true');
    t.ok(wb.styles[ws.cell(2,5).cells[0].s].border.right === undefined, 'Right side of top left cell should NOT have a border if outline is set to true');
    t.ok(wb.styles[ws.cell(2,5).cells[0].s].border.bottom === undefined, 'Bottom side of top left cell should NOT have a border if outline is set to true');

    t.end(); 
});


