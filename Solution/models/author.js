var mongoose = require('mongoose');

console.log('Initializing author schema');

var authorSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    country: { type: String, default: 'NL' },
    ranking: { type: Number, unique: true, min: 1 },
    books: [{ type: String, ref: 'Book' }]
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

authorSchema.virtual('fullName').get(function () {
    var fullName = this.firstName + ' ';
    if (this.middleName && this.middleName.length) {
        fullName += this.middleName + ' ';
    }
    fullName += this.lastName;

    return fullName;
});

authorSchema.virtual('age').get(function () {
    var ageDifMs = Date.now() - this.birthDate.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
});

authorSchema.virtual('numberOfBooks').get(function () {
    return this.books.length;
});

authorSchema.path('birthDate').validate(function (val) {
    return val && val < new Date();
}, 'BirthDate must be before today.');

authorSchema.query.byPage = function (pageIndex, pageSize) {
    pageIndex = pageIndex || 0;
    pageSize = pageSize || 10;
    return this.find().skip(pageIndex * pageSize).limit(pageSize);
};

authorSchema.query.byCountry = function (countryCode) {
    if (countryCode) {
        return this.find({ country: countryCode });
    } else {
        return this.find();
    }
};

authorSchema.query.byFullname = function (fullName) {
    if (fullName) {
        return this.find({ fullName: fullName });
    } else {
        return this.find();
    }
};

mongoose.model('Author', authorSchema);