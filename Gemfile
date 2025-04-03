source "https://rubygems.org"

# Jekyll and Theme
gem "jekyll", "~> 4.4.1"
gem "minima", "~> 2.5"

# Pagination Plugin
gem "jekyll-paginate"

# Logger Gem to avoid deprecation warning
gem "logger"

# Jekyll Plugins
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"       # Sitemap plugin for SEO
end

# Windows and JRuby support
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1", platforms: [:mingw, :x64_mingw, :mswin]

# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds
gem "http_parser.rb", "~> 0.6.0", platforms: [:jruby]
