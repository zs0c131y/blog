source "https://rubygems.org"

gem "jekyll", "~> 4.3.3"
gem "csv"    # Added for Ruby 3.4 compatibility
gem "logger" # Added for future Ruby 3.5 compatibility
gem "base64" # Added for Ruby 3.4 compatibility

group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"
  gem "jekyll-paginate"
end

# Windows specific gems
platforms :mingw, :x64_mingw, :mswin do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Required for Ruby >= 3.0
gem "webrick"
