var factories = require('chai-factories');
chai.use(factories);

chai.factory(
	'English plural format example',
	{
		path: 'app/lang/en/test.json',
		data: ['{',
			'"showingProducts": "Showing {NUM, plural, one {Product} other {Products}}.",',
			'"viewResults": "{NUM, plural, zero {No more results} one {1 more result} other {# more results}}",',
			'"questionMark": "?",',
			'"hideMessages": "Hide {NUM, plural, one {this message} other {these messages}}.",',
			'"charactersRemaining": "{NUM, plural, one {1 character} other {# characters}} remaining.",',
			'"cartProducts": "You have {NUM, plural, one {<strong>1</strong> product} other {<strong>#</strong> products}} in your cart.",',
			'"reviewLimit": "You are only allowed to post {NUM_REVIEWS, plural, one {1 product review} other {# product reviews}} every {NUM_LIMIT_DURATION, plural, one {1 day} other {# days}}.",',
			'"wishlistProducts": "Your wishlist contains {NUM_PRODUCTS, plural, one {1 product} other {# products in {NUM_CATEGORIES, plural, one {1 category} other {# categories}}}}.",',
			'"otherCarts": "You {NUM, plural, offset:1 zero {have added this to your cart} one {and one other person have added this to their cart} other {and # others have added this to their carts}}.",',

			'"aeroPress6": "Mix the water and coffee with the stirrer for about {NUM, plural, one {1 second} other {# seconds}}."',
		'}'].join('\n')
	}
);

chai.factory(
	'simple replacement example in English',
	{
		path: 'app/lang/en/test.json',
		data: '{\n"questionMark": "?"\n}'
	}
);

chai.factory(
	'pluralisation example in English',
	{
		path: 'app/lang/en/test.json',
		data: '{\n"hideMessages": "Hide {NUM, plural, one {this message} other {these messages}}."\n}'
	}
);