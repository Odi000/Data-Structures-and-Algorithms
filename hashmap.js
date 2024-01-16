class HashMap {
    constructor(size = 16) {
        this.buckets = [];
        this.bucketsLength = size;
        this.loadLimit = 0.75;
        this.loadFactor = function () {
            let filledBuckets = 0;
            this.buckets.forEach(el => el ? filledBuckets++ : false);
            return filledBuckets / this.bucketsLength;
        }
    }

    hash(key) {
        let hashCode = 0;

        let primeNr = 3;
        for (let i = 0; i < key.length; i++) {
            hashCode = hashCode * primeNr + key.charCodeAt(i);
        }

        return hashCode;
    }

    set(key, value) {
        const data = { key, value, pointer: null }
        const hashCode = this.hash(key);
        const index = hashCode % this.bucketsLength;

        if (this.loadFactor() > this.loadLimit) {
            //Rearrange bucket list
            const newBucketList = new HashMap(this.bucketsLength * 2);
            this.buckets.forEach(bucket => {
                if (!bucket) return;
                newBucketList.set(bucket.key, bucket.value);
            });

            this.bucketsLength = newBucketList.bucketsLength;
            this.buckets = newBucketList.buckets;
        }

        if (this.buckets[index]) {
            const nextEmptyBucket = findEmptyBucket(index + 1, this);
            this.buckets[nextEmptyBucket] = data;

            function findEmptyBucket(index, hashMap) {
                if (index >= hashMap.bucketsLength) index = 0;
                if (hashMap.buckets[index]) return findEmptyBucket(index + 1, hashMap);
                else return index;
            }
        } else {
            this.buckets[index] = data;
        }

        /* 2 Dimensional Way
        if (this.buckets[index]) {
            if (this.buckets[index].key === key) {
                this.buckets[index].value = value;
            } else {
                if (this.buckets[index].pointer) {
                    const lastNode = findLastNode(this.buckets[index].pointer);
                    lastNode.pointer = data;
                } else {
                    this.buckets[index].pointer = data;
                }
            };
        } else {
            this.buckets[index] = data;
        }

        function findLastNode(node) {
            if (!node.pointer) return node;
            else return findLastNode(node.pointer);
        }
        */
    }
}


//Prova

function stringGenerator(base) {
    const stringLength = Math.floor((Math.random() * base) + base);
    const randomLetterCode = () => Math.floor((Math.random() * 26) + 97);
    let string = "";

    for (let i = 0; i < stringLength; i++) {
        string += String.fromCharCode(randomLetterCode());
    }

    return string;
}

const sixTeen = [];

while (sixTeen.length < 6) {
    sixTeen[sixTeen.length] = { key: stringGenerator(3), value: stringGenerator(6) };
}

console.log(sixTeen);

const harta = new HashMap();

sixTeen.forEach(el => {
    harta.set(el.key, el.value);
})

console.table(harta.buckets)
