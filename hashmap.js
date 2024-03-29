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

        const hashCode = this.hash(key);
        const index = hashCode % this.bucketsLength;

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

    get(key) {
        const hashCode = this.hash(key);
        const index = hashCode % this.bucketsLength;
        let result = null;

        if (this.buckets[index]) {
            if (this.buckets[index].key === key) {
                result = this.buckets[index];
            } else {
                let checkedBuckets = 1;

                result = checkBuckets(index + 1, key, this);

                function checkBuckets(index, key, hashMap) {
                    if (checkedBuckets >= hashMap.buckets.length) return null;
                    if (index >= hashMap.buckets.length) index = 0;
                    checkedBuckets++;

                    if (hashMap.buckets[index]) {
                        if (hashMap.buckets[index].key === key) {
                            return hashMap.buckets[index];
                        }
                    }

                    return checkBuckets(index + 1, key, hashMap);
                }
            }
        } else {
            result = null;
        }
        return result;
    }

    has(key) {
        if (this.get(key)) return true;
        else return false;
    }

    remove(key) {
        const hashCode = this.hash(key);
        const index = hashCode % this.bucketsLength;
        let result = false;

        if (this.buckets[index]) {
            if (this.buckets[index].key === key) {
                result = index;
            } else {
                let checkedBuckets = 1;

                result = checkBuckets(index + 1, key, this);

                function checkBuckets(index, key, hashMap) {
                    if (checkedBuckets >= hashMap.buckets.length) return false;
                    if (index >= hashMap.buckets.length) index = 0;
                    checkedBuckets++;

                    if (hashMap.buckets[index]) {
                        if (hashMap.buckets[index].key === key) {
                            return index;
                        }
                    }

                    return checkBuckets(index + 1, key, hashMap);
                }
            }
        } else {
            result = false;
        }
        if (result) {
            this.buckets[result] = undefined;
        } else return result;
    }

    length() {
        let length = 0;

        for (let i = 0; i < this.bucketsLength; i++) {
            if (this.buckets[i]) length++;
        }

        return length;
    }

    clear() {
        this.buckets = [];
        this.bucketsLength = new HashMap().bucketsLength;
    }

    keys() {
        let keysArr = [];

        for (let i = 0; i < this.bucketsLength; i++) {
            if (this.buckets[i]) keysArr.push(this.buckets[i].key);
        }

        return keysArr;
    }

    values() {
        let valuesArr = [];

        for (let i = 0; i < this.bucketsLength; i++) {
            if (this.buckets[i]) valuesArr.push(this.buckets[i].value);
        }

        return valuesArr;
    }

    entries() {
        let valuesArr = [];

        for (let i = 0; i < this.bucketsLength; i++) {
            if (this.buckets[i]) {
                valuesArr.push([this.buckets[i].key, this.buckets[i].value]);
            }
        }

        return valuesArr;
    }
}


//Tests

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

while (sixTeen.length < 21) {
    sixTeen[sixTeen.length] = { key: stringGenerator(3), value: stringGenerator(6) };
}

console.log(sixTeen);

const harta = new HashMap();

sixTeen.forEach(el => {
    harta.set(el.key, el.value);
})

console.table(harta.buckets);