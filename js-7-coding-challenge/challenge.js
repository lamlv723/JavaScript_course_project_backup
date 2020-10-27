/////////////////////////////////
// CODING CHALLENGE

/*
Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets
It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.
At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (formula: number of trees/park area)
2. Average age of each town's park (formula: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal
All the report data should be printed to the console.
HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.
*/

class Element {
    constructor(name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }
}

class Park extends Element {
    constructor(name, buildYear, area, tree) {
        super(name, buildYear);
        this.area = area;
        this.tree = tree;
    }
    
    treeDestiny() {
        const destiny = this.tree / this.area;
        console.log(`The tree destiny of ${this.name} is: ${destiny} kilometer square`)
    }
}

class Street extends Element {
    constructor(name, buildYear, len, size = 3) {
        super(name, buildYear);
        this.len = len;
        this.size = size;
    }
    classifyStreet() {
        const classification= new Map();
        classification.set(1, 'tiny');
        classification.set(2, 'small');
        classification.set(3, 'normal');
        classification.set(4, 'big');
        classification.set(5, 'huge');
        console.log(`${this.name}, build in ${this.buildYear}, is a ${classification.get(this.size)} street.`)
    }
}

const allParks = [new Park('Green Park', 1987, 0.2, 215),
                 new Park('National Park', 1894, 2.9, 3541),
                 new Park('Oak Park', 1953, 0.4, 949)];

const allStreets = [new Street('Ocean Avenue', 1999, 1.1, 4),
                   new Street('Evergreen Street', 2008, 2.7, 2),
                   new Street('4th Street', 2015, 0.8),
                   new Street('Sunset Boulevard', 1982, 2.5, 5)];

function calc(arr) {
    const sum = arr.reduce((prev, cur) => prev + cur, 0);
    return [sum, sum / arr.length];
}

function parkReport(park) {
    console.log(`------------------R-E-P-O-R-T----P-A-R-K-S------------------`);

    //CALC DESTINY
    park.forEach(element => element.treeDestiny());
    //AVERAGE AGE
    const ages = park.map(cur => new Date().getFullYear() - cur.buildYear);
    const [totalAge, averageAge] = calc(ages);
    console.log(`The average age of ${park.length} parks is: ${averageAge}.`)
    // >1000 tree park
    const index = park.map(cur => cur.tree).findIndex(el => el >= 1000);
    console.log(`${park[index].name} has more than 1000 trees in its area.`)

};

function streetReport(street) {
    console.log(`------------------R-E-P-O-R-T----S-T-R-E-E-T---------------`);

    // TOTAL & AVERAGE LENGTH 
    const lengths = street.map(cur => cur.len);
    const [totalLength, averageLength] = calc(lengths);
    console.log(`${street.length} streets have the total ${totalLength} kimometer and average length is: ${averageLength} km.`)
    // SIZE
    street.forEach(cur => cur.classifyStreet());
};

parkReport(allParks);
streetReport(allStreets);
