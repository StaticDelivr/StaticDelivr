"use client";

import React from 'react';
import Link from 'next/link';
import { Github, Package, Type, Globe, ArrowRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CodeBlock } from '@/components/ui/code-block';

const QuickStartSection = () => {
  return (
    <section id="quick-start" className="py-24 px-4 bg-white dark:bg-black">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
            Start in Seconds
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Choose your source and start delivering content globally. 
            Click any URL to copy it to your clipboard.
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="npm" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto p-1 bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl mb-8">
            <TabsTrigger 
              value="npm"
              className="flex items-center justify-center gap-2 py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-900 dark:data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg transition-all"
            >
              <Package className="w-4 h-4" />
              <span className="font-medium">NPM</span>
            </TabsTrigger>
            <TabsTrigger 
              value="github" 
              className="flex items-center justify-center gap-2 py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-900 dark:data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg transition-all"
            >
              <Github className="w-4 h-4" />
              <span className="font-medium">GitHub</span>
            </TabsTrigger>
            <TabsTrigger 
              value="wordpress"
              className="flex items-center justify-center gap-2 py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-900 dark:data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg transition-all"
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium">WordPress</span>
            </TabsTrigger>
            <TabsTrigger 
              value="google-fonts"
              className="flex items-center justify-center gap-2 py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-900 dark:data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg transition-all"
            >
              <Type className="w-4 h-4" />
              <span className="font-medium">Google Fonts</span>
            </TabsTrigger>
          </TabsList>

          {/* NPM Content */}
          <TabsContent value="npm">
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
              <div className="p-6 md:p-8 space-y-8">
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white mb-2 text-lg">Load any npm package</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                    Access any file from any npm package directly via URL.
                  </p>
                  <CodeBlock 
                    code="https://cdn.staticdelivr.com/npm/package@version/file"
                    language="url"
                    allowOpen={true}
                  />
                </div>
                
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white mb-2 text-lg">Example: React</h3>
                  <CodeBlock 
                    code="https://cdn.staticdelivr.com/npm/react@18.2.0/umd/react.production.min.js"
                    language="url"
                    allowOpen={true}
                  />
                </div>

                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                  <Link 
                    href="/npm" 
                    className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                  >
                    Learn more about npm packages
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* GitHub Content */}
          <TabsContent value="github">
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
              <div className="p-6 md:p-8 space-y-8">
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white mb-2 text-lg">Load any GitHub repository file</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                    Replace <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm text-zinc-900 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700">user</code>, 
                    <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm text-zinc-900 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 ml-1">repo</code>, 
                    <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm text-zinc-900 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 ml-1">branch</code>, and 
                    <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm text-zinc-900 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 ml-1">file</code> with your values.
                  </p>
                  <CodeBlock 
                    code="https://cdn.staticdelivr.com/gh/user/repo/branch/file"
                    language="url"
                    allowOpen={true}
                  />
                </div>
                
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white mb-2 text-lg">Example: jQuery</h3>
                  <CodeBlock 
                    code="https://cdn.staticdelivr.com/gh/jquery/jquery/3.6.4/dist/jquery.min.js"
                    language="url"
                    allowOpen={true}
                  />
                </div>

                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                  <Link 
                    href="/github" 
                    className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                  >
                    Learn more about GitHub files
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* WordPress Content */}
          <TabsContent value="wordpress">
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
              <div className="p-6 md:p-8 space-y-8">
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white mb-2 text-lg">Load WordPress themes</h3>
                  <CodeBlock 
                    code="https://cdn.staticdelivr.com/wp/themes/theme-name/version/file"
                    language="url"
                    allowOpen={true}
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white mb-2 text-lg">Example with a theme</h3>
                  <CodeBlock 
                    code="https://cdn.staticdelivr.com/wp/themes/twentytwentythree/1.0/style.css"
                    language="url"
                    allowOpen={true}
                  />
                </div>
                
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white mb-2 text-lg">Load WordPress plugins</h3>
                  <CodeBlock 
                    code="https://cdn.staticdelivr.com/wp/plugins/plugin-name/tags/tag-name/file"
                    language="url"
                    allowOpen={true}
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white mb-2 text-lg">Example with a plugin</h3>
                  <CodeBlock 
                    code="https://cdn.staticdelivr.com/wp/plugins/woocommerce/tags/9.3.3/assets/js/frontend/woocommerce.min.js"
                    language="url"
                    allowOpen={true}
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white mb-2 text-lg">Load WordPress core file</h3>
                  <CodeBlock 
                    code="https://cdn.staticdelivr.com/wp/core/path/file"
                    language="url"
                    allowOpen={true}
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white mb-2 text-lg">Example with WordPress core</h3>
                  <CodeBlock 
                    code="https://cdn.staticdelivr.com/wp/core/trunk/wp-includes/js/jquery/jquery.min.js"
                    language="url"
                    allowOpen={true}
                  />
                </div>

                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                  <Link 
                    href="/wordpress" 
                    className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                  >
                    Learn more about WordPress assets
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Google Fonts Content */}
          <TabsContent value="google-fonts">
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
              <div className="p-6 md:p-8 space-y-8">
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white mb-2 text-lg">Load any Google Font</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                    Use the same syntax as Google Fonts CSS API.
                  </p>
                  <CodeBlock 
                    code="https://cdn.staticdelivr.com/gfonts/css2?family=Font+Name"
                    language="url"
                    allowOpen={true}
                  />
                </div>
                
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white mb-2 text-lg">Example: Open Sans with weights</h3>
                  <CodeBlock 
                    code="https://cdn.staticdelivr.com/gfonts/css2?family=Open+Sans:wght@400;600;700"
                    language="url"
                    allowOpen={true}
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white mb-2 text-lg">HTML Usage</h3>
                  <CodeBlock 
                    code={`<link href="https://cdn.staticdelivr.com/gfonts/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">`}
                    language="html"
                    allowOpen={true}
                  />
                </div>

                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                  <Link 
                    href="/google-fonts" 
                    className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                  >
                    Learn more about Google Fonts
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Help Link */}
        <div className="text-center mt-12">
          <p className="text-zinc-600 dark:text-zinc-400">
            Need more examples?{' '}
            <Link href="/docs" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium underline underline-offset-4 transition-colors">
              Check our documentation
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default QuickStartSection;
